import React, { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import Markdown from "markdown-to-jsx";
import readingTime from "reading-time";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { GithubSelector } from "react-reactions";
import { userClient } from "../Utils/apollo";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { config } from "../config";
import { getEmojiByName, getNameByEmoji } from "../Utils/emoji";
import { getAuthenticatedUser } from "../Utils/auth";
import { Loader } from "../Components/Common";
import {
  PostContainer,
  PostTitle,
  PostDate,
  PostReaction,
  BackButton,
} from "../Components/Post";
import {
  AuthorDetails,
  AuthorAvatar,
  AuthorName,
} from "../Components/Post/Author";
import { GithubLogin } from "../Components/Header";

export default function BlogHome() {
  const issueNumber = parseInt(window.location.href.split("/").pop());
  const GET_POSTS = gql`{
    repository(owner: "${config.githubUserName}", name: "${config.githubRepo}") {
      issue(number: ${issueNumber}) {
        title
        body
        bodyHTML
        url
        bodyText
        number
        bodyHTML
        author {
          url
          avatarUrl
          login
        }
        reactions(first:100){
          nodes{
            content
            user{
              id
              login
            }
          }
        }
        updatedAt
        id
      }
    }
  }
  `;
  const [post, setPost] = useState([]);
  const [postNodeId, setPostNodeId] = useState("");
  const [reactionPopup, setReactionPopup] = useState(false);
  const [postReactions, setPostReactions] = useState([]);
  const { loading, error, data } = useQuery(GET_POSTS);
  const reactionsContainer = useRef(null);
  const userToken = localStorage.getItem("githubToken");

  const setReactionFun = useCallback((reactions) => {
    // {
    //   emoji: "👍", // String emoji reaction
    //   by: "case" // String of persons name
    // }

    let reactions_array = [];
    reactions.forEach((element) => {
      let obj = {
        by: element.user.login,
        emoji: getEmojiByName(element.content),
      };
      reactions_array.push(obj);
    });

    setPostReactions(reactions_array);
  }, []);

  const HyperLink = ({ children, ...props }) => (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-post-anchor"
    >
      {children}
      <style jsx="true">
        {`
          a {
            color: #484848;
            font-weight: 400;
          }
        `}
      </style>
    </a>
  );

  const CodeBlock = ({ children }) => (
    <SyntaxHighlighter language="javascript" style={docco}>
      {children.props.children}
    </SyntaxHighlighter>
  );

  const toggleReaction = async (emoji) => {
    let reactions = postReactions;
    const user = await getAuthenticatedUser();
    const existingReaction = reactions.filter(
      (r) => r.emoji === emoji && r.by === user.login
    );

    if (existingReaction.length === 0) {
      const reactionToAdd = {
        by: user.login,
        emoji: emoji,
      };

      // Add the reaction
      await userClient(userToken).mutate({
        mutation: gql`
          mutation AddReaction {
            addReaction(input:{subjectId:"${postNodeId}",content:${getNameByEmoji(
          emoji
        )},clientMutationId:"${user.node_id}"}) {
              reaction {
                id
              }
            }
          }
        `,
      });

      reactions.push(reactionToAdd);
    } else {
      // Remove the reaction
      await userClient(userToken).mutate({
        mutation: gql`
          mutation RemoveReaction {
            removeReaction(input:{subjectId:"${postNodeId}",content:${getNameByEmoji(
          emoji
        )},clientMutationId:"${user.node_id}"}) {
              reaction {
                id
              }
            }
          }
        `,
      });

      // Remove the reaction from the state
      reactions = reactions.filter(
        (r) => !(r.by === user.login && r.emoji === emoji)
      );
    }

    setPostReactions(reactions);
    reactionsContainer.current.forceUpdate(); // refresh the counter
    setReactionPopup(false); // hiding the reactions choice
  };

  useEffect(() => {
    if (!loading) {
      if (data) {
        const issues = data.repository.issue;
        setPostNodeId(issues.id);
        setPost(issues);
        setReactionFun(issues.reactions.nodes);
      }
    }
  }, [loading, error, data, setReactionFun]);

  if (loading) {
    return <Loader />;
  }

  const onBackClick = () => {
    // ifthe previous page does not exist in the history list. this method to load the previous (or next) URL in the history list.
    window.history.go();
    // The back() method loads the previous URL in the history list.
    window.history.back();
  };

  return (
    <>
      <Helmet>
        <meta name="title" property="og:title" content={post.title} />
        {/* <meta name="description" property="og:description" content={post.body} /> */}
      </Helmet>
      {post.title && (
        <PostContainer>
          <BackButton onClick={() => onBackClick()}>Back</BackButton>

          <PostTitle>{post.title}</PostTitle>
          <div>
            <AuthorDetails>
              <AuthorAvatar
                src={post.author.avatarUrl}
                alt={post.author.login}
              />
              <div>
                <AuthorName>
                  {post.author.login === "betheunique"
                    ? "Abhishekkumar Rai"
                    : post.author.login}
                </AuthorName>
                <PostDate>
                  {moment(post.updatedAt).format("DD MMM YYYY")} .
                  {readingTime(post.body).minutes} Min Read .
                </PostDate>
              </div>
            </AuthorDetails>
          </div>
          <Markdown
            options={{
              overrides: {
                a: {
                  component: HyperLink,
                },
                pre: {
                  component: CodeBlock,
                },
              },
            }}
          >
            {post.body}
          </Markdown>
          {reactionPopup && (
            <PostReaction>
              {userToken ? (
                <GithubSelector onSelect={(emoji) => toggleReaction(emoji)} />
              ) : (
                <GithubLogin isAbsolute={false} />
              )}
            </PostReaction>
          )}
        </PostContainer>
      )}
    </>
  );
}
