import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Unlock } from "./icon";
import { socket } from "socket";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getRoomsLength, roomRepository, userState } from "repository";
import { limitNumber } from "function/function";

export const RoomEntrance = ({
  id = "",
  current = "0",
  max = "8",
  title = "No Title",
  isLock = false,
}) => {
  const url = `/room/${id}`;
  // 입장 할 채팅방 컴포넌트
  return (
    <Link to={url} className="room_entrance flex">
      <h1>{title}</h1>
      <div className="meta flex">
        <h3>
          {current} / {max}
        </h3>
        {isLock ? <Lock /> : <Unlock />}
      </div>
    </Link>
  );
};

const RoomController = ({ func, gridFunc, current, max }) => {
  const [isFirst, setFirst] = useState(current === 1);
  const [isLast, setLast] = useState(current === max);
  const leftClass = "xi-caret-down icon_button";
  const rightClass = "xi-caret-up icon_button";
  useEffect(() => {
    if (current === 1) {
      setFirst(true);
    } else {
      setFirst(false);
    }
    if (current === max) {
      setLast(true);
    } else {
      setLast(false);
    }
  }, [current, max]);
  function changeRoomView(i) {
    gridFunc((prev) => {
      let value = prev + i;
      if (value < 1) {
        value = 1;
      } else if (value > max) {
        value = max;
      }
      return value;
    });
  }
  function makeRoom() {
    func(true);
  }
  //대기방 컨트롤러 컴포넌트
  return (
    <div className="room_controller flex">
      <div className="arrow_box flex">
        <i
          className={isFirst ? `${leftClass} inactive` : leftClass}
          onClick={() => changeRoomView(-1)}
        ></i>
        <i
          className={isLast ? `${rightClass} inactive` : rightClass}
          onClick={() => changeRoomView(1)}
        ></i>
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
  const nav = useNavigate();
  const user = useRecoilValue(userState);
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
    const myInfo = {};
    Object.defineProperty(myInfo, user.uid, {
      value: {
        name: user.name,
        photo: user.photo,
        isLogin: true,
      },
      configurable: true,
      enumerable: true,
      writable: true,
    });
    const roomData = {
      id: -1,
      title: titleRef.current.value,
      password: pwd,
      current: 0,
      max: number,
      userList: myInfo,
    };
    socket.emit("newRoom", roomData);
    func();
    socket.off("newRoomId");
    socket.on("newRoomId", (id) => {
      nav(`/room/${id}`);
    });
  }
  //방 생성 모달(modal)창 컴포넌트
  return (
    <div className="dimm">
      <form className="create_setting">
        <div className="input_box title">
          <h3>방 제목</h3>
          <input type="text" ref={titleRef} autoFocus />
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
          <input
            type="checkbox"
            checked={isChecked}
            onChange={changeLockState}
          />
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
    </div>
  );
};

const Rooms = () => {
  const [isActive, setActive] = useState(false);
  const [gridNum, setGridNum] = useState(1);
  const roomsLength = useRecoilValue(getRoomsLength);
  const quotient = Math.ceil(roomsLength / 6);
  const setRooms = useSetRecoilState(roomRepository);
  const rooms = useRecoilValue(roomRepository);
  const roomGrid = rooms.filter((room, idx) => {
    return idx >= (gridNum - 1) * 6 && idx < gridNum * 6;
  });
  socket.off("rooms");
  socket.on("rooms", (data) => {
    setRooms(data);
  });
  function setActiveState(state = false) {
    if (state) {
      setActive(true);
    } else {
      setActive(false);
    }
  }
  //대기방 전체 렌더링
  return (
    <main>
      <div className="room_box">
        {roomGrid.map((room) => {
          const { id, current, max, password, title } = room;
          const isLock = password === "" ? false : true;
          return (
            <RoomEntrance
              key={id}
              id={id}
              current={current}
              max={max}
              title={title}
              isLock={isLock}
            />
          );
        })}
      </div>
      <RoomController
        func={setActiveState}
        gridFunc={setGridNum}
        current={gridNum}
        max={quotient === 0 ? 1 : quotient}
      />
      {isActive && <RoomtCreateSetting func={setActiveState} />}
    </main>
  );
};

export default Rooms;
