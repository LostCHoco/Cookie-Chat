import Header from "components/header";
import Aside from "components/aside";
import Rooms from "components/rooms";
import Chatbox from "components/chat";
import { SignInForm, SignUpForm } from "components/signForm";
import homeStyle from "css/home.css";
import roomStyle from "css/room.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState, roomRepository, loginState } from "repository";
import { socket } from "socket";
import { useEffect } from "react";

export const WaitingRoom = () => {
  //대기방 렌더링
  return (
    <div id="body" style={homeStyle}>
      <Header />
      <Rooms />
    </div>
  );
};

export const Room = () => {
  const { id } = useParams();
  const rooms = useRecoilValue(roomRepository);
  const user = useRecoilValue(userState);
  const ids = ["test"];
  rooms.forEach((room) => {
    ids.push(room.id);
  });
  /*방의 아이디가 서버에 존재하면 채팅방을 보여주고,
    서버에 없으면 NotFound 페이지를 보여줌*/
  const isRoom = ids.includes(id);
  const isLogin = useRecoilValue(loginState);
  useEffect(() => {
    if (isRoom) {
      socket.emit("enter-room", { id: id, user: user });
    }
  }, [id, isRoom, user]);
  const room = rooms.find((element) => {
    return element.id === id;
  });
  const title = room !== undefined ? room.title : "No Title";
  //채팅방 렌더링
  return (
    <div id="body" style={roomStyle}>
      {isRoom && isLogin ? (
        <>
          <Header title={title} />
          <div className="container flex">
            <Aside />
            <Chatbox />
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export const SignIn = () => {
  //로그인 렌더링
  return (
    <>
      <Header />
      <SignInForm />
    </>
  );
};

export const SignUp = () => (
  //회원가입 렌더링
  <>
    <Header />
    <SignUpForm />
  </>
);
export const NotFound = () => {
  const nav = useNavigate();
  function goHome() {
    nav("/");
  }
  //오류 페이지 렌더링
  return (
    <div className="error flex">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <button onClick={goHome}>홈으로</button>
    </div>
  );
};
