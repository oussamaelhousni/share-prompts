"use client";
import Profile from "@components/Profile";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = async (id) => {
    router.push(`/update-prompt/${id}`);
  };

  const handleDelete = async (id) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((item) => item._id !== id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setPosts(data);
        }
      } catch (error) {
        console.log("error in fetching user posts");
      }
    };
    console.log("outside", session);
    if (session?.user?.id) {
      console.log("insdide");
      fetchUserPosts();
    }
  }, []);
  return (
    <Profile
      name={session?.username}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
