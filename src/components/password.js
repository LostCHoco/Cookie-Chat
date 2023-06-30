import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roomRepository, userState } from "repository";
import { socket } from "socket";

export const RoomPwd = () => {
  const { id } = useParams();
  const [pwd, setPwd] = useState("");
  const user = useRecoilValue(userState);
  const rooms = useRecoilValue(roomRepository);
  const room = rooms.find((element) => {
    return element.id === id;
  });
  function checkPwd() {
    if (pwd === room.password) {
      socket.emit("pass-login", [id, user.uid]);
    }
  }
  return (
    <div className="room_password">
      <form className="flex">
        <h3>비밀번호</h3>
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button type="button" onClick={checkPwd}>
          입력
        </button>
      </form>
    </div>
  );
};
