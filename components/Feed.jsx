"use client";
import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            post={post}
            key={post._id}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const filterPrompts = (searchText) => {
    const regEx = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regEx.test(post.prompt) ||
        regEx.test(post.tag) ||
        regEx.test(post.creator.username)
    );
  };

  const handleOnChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    setSearchTimeOut(
      setTimeout(() => {
        setSearchedResults(filterPrompts(e.target.value));
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("error in fetching posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <div className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleOnChange}
          required
          className="search_input peer"
        />
      </div>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
