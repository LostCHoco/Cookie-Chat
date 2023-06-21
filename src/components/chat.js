import { useState } from "react";
import { getFullTime } from "../function/date";
import { SubProfile } from "./icon";
import { useRecoilState, useRecoilValue } from "recoil";
import { socket } from "socket";
import { useParams } from "react-router-dom";
import { userState, chatRepository } from "repository";

const Output = ({ task }) => {
  const { user, date, text } = task;
  return (
    <div className="output">
      <div className="date flex">
        <SubProfile />
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
  const { name } = useRecoilValue(userState);

  function sendMsg(e) {
    const text = e.target.value;
    if (e.keyCode === 13 && e.shiftKey === false && text !== "") {
      const data = { id: roomID, user: name, date: getFullTime(), text: text };
      socket.emit("chat-request", data);
      setContent("");
      setRow(1);
      setSendState(true);
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
  return (
    <div className="input">
      <textarea
        rows={row}
        onKeyDown={sendMsg}
        onChange={checkSendState}
        onFocus={() => setRow(7)}
        onBlur={() => setRow(1)}
        type="text"
        placeholder="메세지 입력"
        value={content}
      ></textarea>
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
