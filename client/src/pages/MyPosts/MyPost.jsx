import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
import { BASE_URL } from "../../constants";
import { Context } from "../../context/Context";
import "./myPost.css";

const MyPost = () => {
  const { user } = useContext(Context);
  const [posts, setPost] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        BASE_URL + "/posts/user-post/" + user.username
      );
      setPost(res.data);
    })();
  }, [user]);
  return (
    <div className="myposts">
      {posts.map((post) => (
        <Post key={post._id} post={post} pemission={true} />
      ))}
    </div>
  );
};

export default MyPost;
