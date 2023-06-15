import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInError } from "../function/error";
import { useNavigate } from "react-router-dom";
import auth from "auth";

export const SignInForm = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const nav = useNavigate();

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, id, pwd);
      nav("/");
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
