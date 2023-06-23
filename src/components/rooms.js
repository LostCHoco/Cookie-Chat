import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Lock, Unlock } from "./icon";
import { socket } from "socket";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getRooms, roomRepository } from "repository";
import { limitNumber } from "function/function";

export const RoomEntrance = ({
  id = "",
  current = "0",
  max = "8",
  title = "No Title",
  isLock = false,
}) => {
  const url = `/room/${id}`;
  return (
    <Link to={url} className="room_entrance flex">
      <h1>{title}</h1>
      <div className="meta_Box">
        <div className="meta flex">
          <h3>
            {current} / {max}
          </h3>
          {isLock ? <Lock /> : <Unlock />}
        </div>
        <div className="profile_box flex"></div>
      </div>
    </Link>
  );
};
const RoomController = ({ func }) => {
  function makeRoom() {
    func(true);
  }
  return (
    <div className="room_controller flex">
      <div className="arrow_box flex">
        <i className="xi-caret-down icon_button"></i>
        <i className="xi-caret-up icon_button"></i>
      </div>
      <i className="xi-plus icon_button" onClick={makeRoom}></i>
    </div>
  );
};

const RoomtCreateSetting = ({ func }) => {
  const [isLock, setLock] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [pwd, setPwd] = useState("");
  const [number, setNumber] = useState(8);
  const titleRef = useRef();
  function changeLockState() {
    if (isChecked) {
      setChecked(false);
      setLock(true);
      setPwd("");
    } else {
      setLock(false);
      setChecked(true);
    }
  }
  function changePwd(e) {
    setPwd(e.target.value);
  }

  function stepNumber(inc) {
    setNumber((prev) => {
      let value = parseInt(prev) + inc;
      value = limitNumber(value);
      return value;
    });
  }
  function requestNewRoom() {
    const roomData = {
      id: -1,
      title: titleRef.current.value,
      password: pwd,
      current: 0,
      max: number,
      userList: [],
    };
    socket.emit("newRoom", roomData);
    func();
  }
  return (
    <form className="create_setting">
      <div className="input_box title">
        <h3>방 제목</h3>
        <input type="text" ref={titleRef} />
      </div>
      <div className="input_box password">
        <h3>비밀번호</h3>
        <input
          type="password"
          className="input_password"
          value={pwd}
          onChange={changePwd}
          disabled={isLock}
        />
        <input type="checkbox" checked={isChecked} onChange={changeLockState} />
      </div>
      <div className="input_box count">
        <h3>방 정원</h3>
        <div className="number_controller flex">
          <i
            className="xi-caret-down icon_button"
            onClick={() => stepNumber(-1)}
          ></i>
          <h3>{number}</h3>
          <i
            className="xi-caret-up icon_button"
            onClick={() => stepNumber(1)}
          ></i>
        </div>
      </div>
      <div className="button_box flex">
        <button type="button" onClick={requestNewRoom}>
          생성
        </button>
        <button
          type="button"
          onClick={() => {
            func();
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
};

const Rooms = () => {
  const [isActive, setActive] = useState(false);
  const setRooms = useSetRecoilState(roomRepository);
  const rooms = useRecoilValue(getRooms);
  socket.off("rooms");
  socket.on("rooms", (data) => {
    console.log("응답");
    setRooms(data);
  });

  function setActiveState(state = false) {
    if (state) {
      setActive(true);
    } else {
      setActive(false);
    }
  }
  return (
    <main>
      <div className="room_box">
        <RoomEntrance title="Test Room" key="test" id="test" />
        {rooms}
      </div>
      <RoomController func={setActiveState} />
      {isActive && <RoomtCreateSetting func={setActiveState} />}
    </main>
  );
};

export default Rooms;
