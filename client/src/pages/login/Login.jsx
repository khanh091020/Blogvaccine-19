import axios from "axios";
import { useContext, useRef } from "react";
import { BASE_URL } from "../../constants";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFecthing } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(BASE_URL + "/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <pan className="loginTitle">COVID-19 VACCINE</pan>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" className="loginInput" ref={userRef} />

        <label>Mật khẩu</label>
        <input type="password" className="loginInput" ref={passwordRef} />

        <button className="loginButton" type="submit" disabled={isFecthing}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
