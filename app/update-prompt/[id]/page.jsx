"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const params = useParams();
  const promptId = params.id;
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setPost({ prompt: data.prompt, tag: data.tag });
        }
      } catch (error) {
        console.log("FUCK POST");
      }
    };

    if (promptId) getPostDetails();
  }, [promptId]);

  return (
    <>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePost}
      />
    </>
  );
};

export default UpdatePrompt;
