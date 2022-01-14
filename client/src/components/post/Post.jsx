import "./post.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Post({ post, pemission, handleDelete, handleAccept }) {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  return (
    <div className="post">
      {pemission && !user?.isAdmin && (
        <div className={`statusPost ${post.isShown ? "success" : "warning"}`}>
          {post.isShown ? "Đã lên sóng" : "Chờ duyệt"}
        </div>
      )}
      {pemission && user?.isAdmin && (
        <div className="actionAdminPost">
          <button
            className="btn_delete btn"
            onClick={handleDelete.bind(this, post._id)}
          >
            Xóa
          </button>
          <button
            className="btn_accept btn"
            onClick={handleAccept.bind(this, post._id)}
          >
            Duyệt
          </button>
        </div>
      )}
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {" "}
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>

      <p className="postDesc">
        <div dangerouslySetInnerHTML={{ __html: post.desc }}></div>
      </p>
    </div>
  );
}
