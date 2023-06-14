import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../server/firebase";
import { signInError } from "../function/error";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "./repository";

export const SignInForm = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const nav = useNavigate();
  const setUserData = useSetRecoilState(userState);

  async function login() {
    const auth = getAuth(app);
    try {
      const credential = await signInWithEmailAndPassword(auth, id, pwd);
      const user = credential.user.reloadUserInfo;
      // window.location.pathname = "/";
      nav("/");
      setUserData({
        islogin: true,
        UID: user.localId,
        email: user.email,
        name: user.displayName,
      });
    } catch (e) {
      signInError(e);
    }
  }
  return (
    <form className="signin">
      <label htmlFor="id">아이디</label>
      <input
        type="text"
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        id="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <button type="button" onClick={login}>
        로그인
      </button>
    </form>
  );
};

export const SignUpForm = () => {
  return (
    <form className="signup">
      <span>아이디</span>
      <input type="text" />
      <span>비밀번호</span>
      <input type="password" />
      <span>비밀번호 확인</span>
      <input type="password" />
      <span>닉네임</span>
      <input type="text" />
      <button>회원가입</button>
    </form>
  );
};
