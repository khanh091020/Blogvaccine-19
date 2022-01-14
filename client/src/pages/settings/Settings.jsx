import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(BASE_URL + "/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(BASE_URL + "/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Cập nhật tài khoản</span>
        </div>

        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Trang cá nhân</label>

          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fas fa-user"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <label>Tên người dùng</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Mật khẩu</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="settingsSubmit" type="submit">
            Cập nhật
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "10px" }}
            >
              Profile has been updated...
            </span>
          )}

          <span className="settingsDeleteTitle">Xóa tài khoản</span>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
