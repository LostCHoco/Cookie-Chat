import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Unlock, SubProfile } from "./icon";
import { socket } from "socket";

const SmallRoom = ({ title = "방 제목", max = 16 }) => {
  const [current] = useState(0);
  return (
    <Link to="/room" className="small_room flex">
      <h1>{title}</h1>
      <div className="meta_Box">
        <div className="meta flex">
          <h3>
            {current} / {max}
          </h3>
          <Unlock />
        </div>
        <div className="profile_box flex">
          <SubProfile />
          <SubProfile />
        </div>
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
        <i className="xi-caret-down"></i>
        <i className="xi-caret-up"></i>
      </div>
      <i className="xi-plus" onClick={makeRoom}></i>
    </div>
  );
};

const RoomtCreateSetting = ({ func }) => {
  const [isLock, setLock] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [pwd, setPwd] = useState("");
  const [number, setNumber] = useState(8);
  const titleRef = useRef();
  // const pwdRef = useRef();
  function changeLockState({ func }) {
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
  function changeNumber(e) {
    const value = e.target.value;
    console.log(parseInt(value));
    setNumber(value);
  }
  function stepNumber(inc) {
    setNumber((prev) => prev + inc);
  }
  function requestNewRoom() {
    const roomData = {
      id: -1,
      title: titleRef.current.value,
      password: pwd,
      current: 0,
      max: number,
    };
    socket.emit("newRoom", roomData);
  }
  function cancelRoom() {
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
          <i className="xi-caret-down" onClick={() => stepNumber(-1)}></i>
          <input
            max={32}
            min={1}
            type="number"
            step="1"
            value={number}
            onChange={changeNumber}
          />
          <i className="xi-caret-up" onClick={() => stepNumber(1)}></i>
        </div>
      </div>
      <div className="button_box flex">
        <button type="button" onClick={requestNewRoom}>
          생성
        </button>
        <button type="button" onClick={cancelRoom}>
          취소
        </button>
      </div>
    </form>
  );
};

const Roombox = () => {
  const [isActive, setActive] = useState(false);

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
        <SmallRoom title="Test Room" />
      </div>
      <RoomController func={setActiveState} />
      {isActive && <RoomtCreateSetting func={setActiveState} />}
    </main>
  );
};

export default Roombox;
