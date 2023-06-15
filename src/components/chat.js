import { useReducer, useState } from "react";
import { getFullTime } from "../function/date";
import { SubProfile } from "./icon";
import { useRecoilValue } from "recoil";
import { userState } from "loginState";

const Output = ({ task }) => {
  const { user, date, text } = task;
  return (
    <div className="output">
      <div className="date flex">
        <SubProfile />
        <span>{user}</span>
        <p>{date}</p>
      </div>
      <div className="content">
        <pre>{text}</pre>
      </div>
    </div>
  );
};
const Input = ({ propFunc }) => {
  const [row, setRow] = useState(1);
  const [isSend, setSendState] = useState(false);
  const [content, setContent] = useState("");
  const { name } = useRecoilValue(userState);

  function sendMsg(e) {
    const text = e.target.value;
    if (e.keyCode === 13 && e.shiftKey === false && text !== "") {
      const data = { user: name, date: getFullTime(), text: text };
      propFunc(data);
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
      setContent(content);
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

const OutputBox = ({ tasks }) => {
  return (
    <div className="output_box">
      {tasks.map((task) => (
        <Output task={task} key={task.id} />
      ))}
    </div>
  );
};
const Chatbox = ({ user }) => {
  const [tasks, dispatch] = useReducer(reducer, []);
  let id = tasks.length;

  function getText(data) {
    dispatch({
      id: id++,
      user: data.user,
      date: data.date,
      text: data.text,
    });
  }

  function reducer(tasks, action) {
    return [
      ...tasks,
      {
        id: action.id,
        user: action.user,
        date: action.date,
        text: action.text,
      },
    ];
  }

  return (
    <main>
      <div className="chat_box">
        <OutputBox tasks={tasks} />
        <Input propFunc={getText} user={user} />
      </div>
    </main>
  );
};

export default Chatbox;
