import { useState } from "react";
import { Link } from "react-router-dom";
import { Unlock, SubProfile } from "./icon";

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
const RoomController = () => (
  <div className="room_controller flex">
    <div className="arrow_box flex">
      <span className="icon-arrow-left"></span>
      <span className="icon-arrow-right"></span>
    </div>
    <span className="icon-plus"></span>
  </div>
);
const Roombox = () => (
  <main>
    <div className="room_box">
      <SmallRoom />
    </div>
    <RoomController />
  </main>
);

export default Roombox;
