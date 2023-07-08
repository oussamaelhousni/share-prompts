"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPostsAndUser = async () => {
      const fetchPosts = fetch(`/api/users/${params?.id}/posts`);
      const fetchUser = fetch(`/api/users/${params?.id}`);
      const userResponse = await fetchUser;
      const postsResponse = await fetchPosts;
      const user = await userResponse.json();
      setUser(user);
      const posts = await postsResponse.json();
      setUserPosts(posts);
    };

    if (params?.id) fetchPostsAndUser();
  }, [params.id]);

  return (
    <Profile
      name={user?.username}
      desc={`Welcome to ${user?.username}'s personalized profile page. Explore ${user?.username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
