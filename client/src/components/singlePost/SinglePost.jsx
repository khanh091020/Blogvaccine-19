import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        BASE_URL + "/posts/" + postId + "/" + user.username
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [postId, user.username]);

  const handleDelete = async () => {
    try {
      await axios.delete(BASE_URL + `/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(BASE_URL + `/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post?.photo && (
          <img src={PF + post?.photo} alt="" className="singlePostImg" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {user && post?.username === user.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>

                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAutho">
            Người đăng:
            <Link to={`/?user=${post?.username}`} className="link">
              <b> {post?.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Cập nhật
          </button>
        )}
      </div>
    </div>
  );
}
