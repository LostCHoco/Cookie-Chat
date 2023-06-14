import "../css/home.css";

import Header from "../components/header";
import Aside from "../components/aside";
import Roombox from "../components/roombox";
/* 
  div.flex : 컨테이너 안의 컴포넌트를
  css의 flex 속성을 이용해서 가로로 정렬해서 보여줌
*/
const Home = () => (
  <>
    <Header />
    <div className="container flex">
      <Aside />
      <Roombox />
    </div>
  </>
);

export default Home;
