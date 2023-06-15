import { Link, useNavigate } from "react-router-dom";
import imgHome from "../image/home.png";
import { Profile } from "./icon";
import { signOut } from "firebase/auth";
import auth from "auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { defaultState, userState } from "loginState";

const Login = () => (
  <>
    {window.location.pathname !== "/signin" ? (
      <Link to="/signin">
        <label className="login_btn">로그인</label>
      </Link>
    ) : (
      <Link to="/signup">
        <label className="login_btn">회원가입</label>
      </Link>
    )}
  </>
);

const UserBox = ({ logout }) => {
  return (
    <div className="user_box flex">
      <Profile logout={logout} />
    </div>
  );
};

const Header = ({ title = "쿠키챗" }) => {
  const nav = useNavigate();
  const { isLogin } = useRecoilValue(userState);
  const setuserState = useSetRecoilState(userState);
  async function logout() {
    await signOut(auth);
    setuserState(defaultState);
    nav("/");
  }
  return (
    <header>
      <Link to="/">
        <div className="header_logo">
          <img src={imgHome} alt="Home" />
        </div>
      </Link>
      <h2>{title}</h2>
      {isLogin ? <UserBox logout={logout} /> : <Login />}
    </header>
  );
};

export default Header;
