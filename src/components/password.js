import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roomRepository, userState } from "repository";
import { socket } from "socket";

export const RoomPwd = () => {
  const { id } = useParams();
  const pwd = useRef();
  const [error, setError] = useState(false);
  const user = useRecoilValue(userState);
  const rooms = useRecoilValue(roomRepository);
  const room = rooms.find((element) => {
    return element.id === id;
  });
  function checkPwd(e) {
    if (!(e.keyCode === 13 || e.type === "click")) return false;
    if (pwd.current.value === room.password) {
      socket.emit("pass-login", [id, user.uid]);
    } else {
      setError(true);
      const input = document.querySelector("input");
      input.focus();
    }
  }
  return (
    <div className="room_password">
      <section className="flex">
        <h3>비밀번호</h3>
        <input
          type="password"
          ref={pwd}
          onKeyDown={(e) => checkPwd(e)}
          autoFocus
        />
        {error && <p className="error_msg">비밀번호가 다릅니다.</p>}
        <button type="button" onClick={(e) => checkPwd(e)}>
          입력
        </button>
      </section>
    </div>
  );
};
