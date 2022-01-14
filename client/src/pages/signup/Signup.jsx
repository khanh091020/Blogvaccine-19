import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../constants";
import "./signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(BASE_URL + "/auth/signup", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="signup">
      <span className="signupTitle">ĐĂNG KÝ</span>
      <form className="signupForm" onSubmit={handleSubmit}>
        <label>Tên người dùng</label>
        <input
          type="text"
          className="signupInput"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          type="text"
          className="signupInput"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mật khẩu</label>
        <input
          type="password"
          className="signupInput"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signupButton" type="submit">
          Đăng ký
        </button>

        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Something went wrong!
          </span>
        )}
      </form>
    </div>
  );
}
