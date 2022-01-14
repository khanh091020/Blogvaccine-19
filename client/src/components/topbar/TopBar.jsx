import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://www.facebook.com/botruongboyte.vn">
          <i className="topIcon fab fa-facebook"></i>
        </a>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              TRANG CHỦ
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              GIỚI THIỆU
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              VIẾT BÀI
            </Link>
          </li>
          {user && user.isAdmin && (
            <li className="topListItem">
              <Link className="link" to="/accept">
                DUYỆT BÀI VIẾT
              </Link>
            </li>
          )}
          {user && !user.isAdmin && (
            <li className="topListItem">
              <Link className="link" to="/my-post">
                BÀI VIẾT CỦA BẠN
              </Link>
            </li>
          )}
          <li className="topListItem" onClick={handleLogout}>
            {user && "ĐĂNG XUẤT"}
          </li>
        </ul>
      </div>

      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                ĐĂNG NHẬP
              </Link>
            </li>

            <li className="topListItem">
              <Link className="link" to="/signup">
                ĐĂNG KÝ
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
