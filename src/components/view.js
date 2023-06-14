import Header from "./header";
import Aside from "./aside";
import Roombox from "./roombox";
import Chatbox from "./chat";
import { SignInForm, SignUpForm } from "./signForm";
import homeStyle from "../css/home.css";
import roomStyle from "../css/room.css";
export const Home = () => (
  <div id="body" style={homeStyle}>
    <Header />
    <div className="container flex">
      <Aside />
      <Roombox />
    </div>
  </div>
);

export const Room = ({ user }) => {
  return (
    <div id="body" style={roomStyle}>
      <Header title="방 제목" />
      <div className="container flex">
        <Aside />
        <Chatbox user={user} />
      </div>
    </div>
  );
};

export const SignIn = () => (
  <>
    <Header />
    <SignInForm />
  </>
);

export const SignUp = () => (
  <>
    <Header />
    <SignUpForm />
  </>
);
