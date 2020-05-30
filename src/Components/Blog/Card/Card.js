import React, { useState, useEffect } from "react";
import readingTime from "reading-time";
import { useHistory } from "react-router-dom";

import {
  CardContainer,
  CardHeader,
  CardCategory,
  CardReadingTime,
  CardTitle,
  CardDescription,
  CardCategoryContainer,
} from "./";

export const Card = ({ blog }) => {
  const [labels, setLabels] = useState([]);
  const history = useHistory();

  const openBlog = (title, number) => {
    title = title.replace(/\s+/g, "-").toLowerCase();
    title = title.replace(/\,/g, "");
    title = title.replace(/\:/g, "-");
    title = title.replace(/\./g, "-");
    history.push(`/blog/${title}/${number}`);
  };

  useEffect(() => {
    const labels = blog.labels.nodes.filter((value) => {
      return value.name !== "blog";
    });

    setLabels(labels);
  }, [blog.labels.nodes]);

  return (
    <CardContainer>
      <CardHeader>
        <CardCategoryContainer>
          {labels.map((value, i) => {
            return <CardCategory value={value} key={i} />;
          })}
        </CardCategoryContainer>
        <CardReadingTime time={readingTime(blog.body).minutes} />
      </CardHeader>
      <div onClick={() => openBlog(blog.title, blog.number)}>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>{blog.bodyText}</CardDescription>
      </div>
    </CardContainer>
  );
};
