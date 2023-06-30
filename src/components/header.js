import { Link, useNavigate } from "react-router-dom";
import imgHome from "../image/home.png";
import { Profile } from "./icon";
import { signOut } from "firebase/auth";
import auth from "auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { defaultState, loginState, userState } from "repository";

const Login = () => (
  // 로그인 버튼 컴포넌트 렌더링
  <>
    {window.location.pathname !== "/" ? (
      <Link to="/">
        <label className="login_btn">로그인</label>
      </Link>
    ) : (
      <Link to="/signup">
        <label className="login_btn">회원가입</label>
      </Link>
    )}
  </>
);

const UserBox = ({ logout }) => (
  //유저 프로필 컨테이너 컴포넌트 렌더링
  <div className="user_box flex">
    <Profile logout={logout} />
  </div>
);

const Header = ({ title = "쿠키챗" }) => {
  const nav = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const isLogin = useRecoilValue(loginState);
  async function logout() {
    await signOut(auth);
    setUserState(defaultState);
    nav("/");
  }

  //헤더 컴포넌트 렌더링
  return (
    <header>
      <Link to={isLogin ? "/room" : "/"}>
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
