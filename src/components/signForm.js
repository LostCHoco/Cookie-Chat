import { useId, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { signError } from "../function/validation";
import { useNavigate } from "react-router-dom";
import auth from "auth";
import { convertToKorean } from "function/function";
import { useSetRecoilState } from "recoil";
import { setNickname } from "repository";

const SocialButton = ({ name, action }) => {
  const iconName = `xi-${name}`;
  const buttonName = `social ${name} flex`;
  const buttonText = convertToKorean(name);
  //소셜미디어 로그인 버튼 컴포넌트
  return (
    <form>
      <button type="button" className={buttonName} onClick={action}>
        <div className="social_icon flex">
          <i className={iconName}></i>
        </div>
        {buttonText} 로그인
      </button>
    </form>
  );
};

const Input = ({ name, hook, type = "text" }) => {
  const key = useId();
  const [state, setState, error] = hook;
  const hasError = error === undefined ? false : true;
  //텍스트 입력칸 컴포넌트
  return (
    <>
      {hasError ? (
        <div className="label_box flex">
          <label htmlFor={key}>{name}</label>
          <p className="error_msg signup">{error}</p>
        </div>
      ) : (
        <label htmlFor={key}>{name}</label>
      )}
      <input
        type={type}
        id={key}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </>
  );
};

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMsg, setError] = useState("");
  const nav = useNavigate();
  function login() {
    signInWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        nav("/");
      })
      .catch((e) => {
        console.log(e.code);
        const msg = signError(e);
        setError(msg);
      });
  }
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        nav("/room");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //로그인 컴포넌트
  return (
    <main>
      <form className="sign">
        <Input name="이메일" hook={[email, setEmail]} />
        <Input name="비밀번호" hook={[pwd, setPwd]} type="password" />
        <button type="button" onClick={login}>
          로그인
        </button>
        <p className="error_msg">{errorMsg}</p>
      </form>
      <SocialButton name="google" action={googleLogin} />
    </main>
  );
};

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [nickname, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwd2Error, setPwd2Error] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const updateNickname = useSetRecoilState(setNickname);
  const nav = useNavigate();

  function checkEmpty(stateArray = [], name = "") {
    const [state, error] = stateArray;
    if (state === "") {
      const msg = `${name} 항목이 입력되지 않았습니다.`;
      error(msg);
      return false;
    } else {
      error("");
      return true;
    }
  }

  function checkPwd() {
    let isEmpty = false;
    isEmpty = checkEmpty([pwd, setPwdError], "비밀번호");
    isEmpty = checkEmpty([pwd2, setPwd2Error], "비밀번호 확인");
    if (!isEmpty) {
      return false;
    } else if (pwd !== pwd2) {
      setPwdError("비밀번호가 일치하지 않습니다.");
      setPwd2Error("비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      setPwdError("");
      setPwd2Error("");
      return true;
    }
  }
  function checkAll() {
    let isEmpty = false;
    isEmpty = checkEmpty([email, setEmailError], "이메일");
    isEmpty = checkEmpty([nickname, setNicknameError], "닉네임");
    isEmpty = checkPwd();
    return isEmpty;
  }
  function signUp() {
    if (!checkAll()) return false;

    createUserWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: nickname,
        })
          .then(() => {
            // Profile updated!
            updateNickname(nickname);
            nav("/");
          })
          .catch((e) => {
            console.log(e);
          });
        // ...
      })
      .catch((e) => {
        const msg = signError(e);
        console.dir(e);
        if (msg.includes("이메일")) {
          setEmailError(msg);
        } else if (msg.includes("비밀번호")) {
          setPwdError(msg);
        } else {
          setEmailError("");
          setPwdError("");
        }
      });
  }
  //회원가입 컴포넌트
  return (
    <form className="sign">
      <Input name="이메일" hook={[email, setEmail, emailError]} />
      <Input name="비밀번호" hook={[pwd, setPwd, pwdError]} type="password" />
      <Input
        name="비밀번호 확인"
        hook={[pwd2, setPwd2, pwd2Error]}
        type="password"
      />
      <Input name="닉네임" hook={[nickname, setName, nicknameError]} />
      <button type="button" onClick={signUp}>
        회원가입
      </button>
    </form>
  );
};
