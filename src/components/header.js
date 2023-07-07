import { Link, useNavigate } from "react-router-dom";
import { Profile } from "./icon";
import { signOut } from "firebase/auth";
import auth from "auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { defaultState, loginState, userState } from "repository";
import { useEffect, useState } from "react";
import { MdDarkMode, MdHome, MdLightMode } from "react-icons/md";
import { trueOrFalse } from "function/function";

const SignBtn = ({ link = "/", text = "" }) => {
  return (
    <Link to={link}>
      <label className="login_btn">{text}</label>
    </Link>
  );
};
const Login = () => (
  // 로그인 버튼 컴포넌트 렌더링
  <>
    {window.location.pathname !== "/signin" ? (
      <SignBtn link="/signin" text="로그인" />
    ) : (
      <SignBtn link="/signup" text="회원가입" />
    )}
  </>
);

const UserBox = ({ logout }) => (
  //유저 프로필 컨테이너 컴포넌트 렌더링
  <div className="user_box flex">
    <Profile logout={logout} />
  </div>
);

const DarkMode = () => {
  const init = window.localStorage.getItem("darkmode");
  const isDark = init !== null ? JSON.parse(init) : false;
  const [darkMode, setDarkMode] = useState(isDark);
  useEffect(() => {
    const dom = document.querySelector("html");
    trueOrFalse(darkMode, (bool) => {
      dom.dataset.darkmode = bool;
      window.localStorage.setItem("darkmode", bool);
    });
  }, [darkMode]);
  function toggleDarkMode() {
    trueOrFalse(
      darkMode,
      (bool) => {
        setDarkMode(bool);
      },
      true
    );
  }
  return (
    <button type="button" onClick={toggleDarkMode} className="darkmode flex">
      {darkMode ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

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
      <Link to={"/"}>
        <div className="header_logo">
          {/* <img src={imgHome} alt="Home" /> */}
          <MdHome />
        </div>
      </Link>
      <h2>{title}</h2>
      <DarkMode />
      {isLogin ? <UserBox logout={logout} /> : <Login />}
    </header>
  );
};

export default Header;
