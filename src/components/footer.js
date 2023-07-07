import { FaDiscord } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { GrMail } from "react-icons/gr";

export const Footer = () => {
  return (
    <footer>
      <h3>연락처</h3>
      <div className="address_box flex">
        <div className="address flex">
          <GrMail />
          <p>magizebi25@gmail.com</p>
        </div>
        <div className="address flex">
          <FaDiscord />
          <p>lch25(lch#1886)</p>
        </div>
        <div className="address flex">
          <RiKakaoTalkFill />
          <p>lch.25</p>
        </div>
      </div>
    </footer>
  );
};
