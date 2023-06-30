import { io } from "socket.io-client";
export const socket = io(
  "https://port-0-cookie-server-koh2xljgsdtkq.sel4.cloudtype.app/"
);
/*
연결할 백엔드 서버 : 
"https://port-0-cookie-server-koh2xljgsdtkq.sel4.cloudtype.app/"
"ws://localhost:3333"
*/
