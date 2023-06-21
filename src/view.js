import Header from "components/header";
import Aside from "components/aside";
import Rooms from "components/rooms";
import Chatbox from "components/chat";
import { SignInForm, SignUpForm } from "components/signForm";
import homeStyle from "css/home.css";
import roomStyle from "css/room.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState, roomRepository } from "repository";
import { socket } from "socket";

export const Home = () => {
  return (
    <div id="body" style={homeStyle}>
      <Header />
      <div className="container flex">
        <Rooms />
      </div>
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
  if (isRoom) {
    socket.emit("enter-room", { id: id, name: user });
  }
  const room = rooms.find((element) => {
    return element.id === id;
  });
  const title = room !== undefined ? room.title : "No Title";
  return (
    <div id="body" style={roomStyle}>
      {isRoom ? (
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

export const SignIn = () => (
  <>
    <Header />
    <SignInForm />
  </>
);

export const SignUp = () => (
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
  return (
    <div className="error flex">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <button onClick={goHome}>홈으로</button>
    </div>
  );
};
