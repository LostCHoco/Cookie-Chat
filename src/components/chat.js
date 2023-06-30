import { useState } from "react";
import { getFullTime } from "../function/date";
import { SubProfile } from "./icon";
import { useRecoilState, useRecoilValue } from "recoil";
import { socket } from "socket";
import { useParams } from "react-router-dom";
import { userState, chatRepository } from "repository";

const Output = ({ task }) => {
  const { user, photo, date, text } = task;
  // const reg = /[http:|https:]\S+/g;
  // const hyperTextArray = text.match(reg);
  //채팅 로그 컴포넌트 렌더링
  return (
    <div className="output">
      <div className="date flex">
        <SubProfile photo={photo} />
        <span>
          <b>{user}</b>
        </span>
        <p>{date}</p>
      </div>
      <div className="content">
        <pre>{text}</pre>
      </div>
    </div>
  );
};
const Input = ({ roomID }) => {
  const [row, setRow] = useState(1);
  const [isSend, setSendState] = useState(false);
  const [content, setContent] = useState("");
  const { name, photo } = useRecoilValue(userState);

  function sendTextData() {
    const data = {
      id: roomID,
      user: name,
      photo: photo,
      date: getFullTime(),
      text: content,
    };
    socket.emit("chat-request", data);
    setContent("");
    setRow(1);
    setSendState(true);
    const chatBox = document.querySelector(".output_box");
    const height = chatBox.scrollHeight;
    chatBox.scrollTop = height;
  }
  function sendMsg(e) {
    if (
      (e.keyCode === 13 || e.type === "touchend") &&
      e.shiftKey === false &&
      content !== ""
    ) {
      sendTextData();
    } else if (e.keyCode === 27) {
      setContent("");
      setRow(1);
    } else {
      setRow(7);
    }
  }
  function checkSendState(e) {
    setContent(e.target.value);
    if (isSend) {
      setContent("");
      setSendState(false);
    }
  }
  //채팅 입력칸 컴포넌트 렌더링
  return (
    <div className="input">
      <textarea
        rows={row}
        onKeyDown={sendMsg}
        onFocus={() => setRow(7)}
        onBlur={() => setRow(1)}
        type="text"
        placeholder="메세지 입력"
        onChange={checkSendState}
        value={content}
      ></textarea>
      <div className="send_container flex" onTouchEnd={sendMsg}>
        <i className="xi-send"></i>
      </div>
    </div>
  );
};

const OutputBox = ({ roomID }) => {
  const [chatData, setChatData] = useRecoilState(chatRepository);

  socket.off("chat-response");
  socket.on("chat-response", (data) => {
    setChatData(data);
  });
  const tasks = chatData[roomID] ?? [];
  //채팅 로그 컨테이너 컴포넌트 렌더링
  return (
    <div className="output_box">
      {tasks.map((task, index) => {
        return <Output task={task} key={index} />;
      })}
    </div>
  );
};

const Chatbox = () => {
  const room = useParams();
  //채팅방 컴포넌트 렌더링
  return (
    <main>
      <div className="chat_box">
        <OutputBox roomID={room.id} />
        <Input roomID={room.id} />
      </div>
    </main>
  );
};

export default Chatbox;
