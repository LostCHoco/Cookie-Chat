import "../css/room.css";

import Header from "../components/header";
import Aside from "../components/aside";
import Chatbox from "../components/chat";

const Room = ({ user }) => {
  return (
    <>
      <Header title="방 제목" />
      <div className="container flex">
        <Aside />
        <Chatbox user={user} />
      </div>
    </>
  );
};

export default Room;
