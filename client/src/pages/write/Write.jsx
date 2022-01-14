import axios from "axios";
import { useContext, useState } from "react";
import { BASE_URL } from "../../constants";
import { Context } from "../../context/Context";
import ReactQuill from "react-quill";
import "./write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(BASE_URL + "/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post(BASE_URL + "/posts", newPost);
      window.location.replace("/");
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="Tiêu đề"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <ReactQuill value={desc} onChange={(value) => setDesc(value)} />
        </div>

        <button className="writeSubmit" type="submit">
          Đăng bài
        </button>
      </form>
    </div>
  );
}
