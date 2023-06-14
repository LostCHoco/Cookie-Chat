import { Link } from "react-router-dom";
import imgHome from "../image/home.png";
import { Search, Friend, Mail, Profile } from "./icon";
import { useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../server/firebase";

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
      <Search />
      <Friend />
      <Mail />
      <Profile logout={logout} />
    </div>
  );
};

const Header = ({ title = "쿠키챗" }) => {
  const [isLogin, setState] = useState(false);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user.displayName);
      setState(true);
    }
  });
  async function logout() {
    await signOut(auth);
    setState(false);
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
