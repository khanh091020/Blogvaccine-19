import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
import { BASE_URL } from "../../constants";
import { Context } from "../../context/Context";
import "./accept.css";

const AcceptPost = () => {
  const { user } = useContext(Context);
  const [posts, setPost] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + `/posts/${id}`, {
        data: { username: user.username },
      });
      setPost(posts.filter((post) => post._id !== id));
    } catch (err) {}
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(BASE_URL + `/posts/accept/${id}`, {
        userID: user._id,
      });
      setPost(posts.filter((post) => post._id !== id));
    } catch (err) {}
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(BASE_URL + "/posts/admin-post/" + user._id);
      setPost(res.data);
    })();
  }, [user]);
  return (
    <div className="adminPost">
      <h2>Các bài viết chờ duyệt</h2>
      <div className="container-posts">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            pemission={true}
            handleDelete={handleDelete}
            handleAccept={handleAccept}
          />
        ))}
      </div>
    </div>
  );
};

export default AcceptPost;
