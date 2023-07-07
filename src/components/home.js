import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "repository";

export const MainInHome = () => {
  const isLogin = useRecoilValue(loginState);
  const nav = useNavigate();
  function goRoom() {
    if (isLogin) {
      nav("/room");
    } else {
      nav("/signin");
    }
  }
  return (
    <main className="home">
      <h2>쿠키챗에 오신 것을 환영합니다!</h2>
      <button onClick={goRoom}>채팅 시작하기</button>
    </main>
  );
};
