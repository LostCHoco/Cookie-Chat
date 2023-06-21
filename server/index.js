import { Server } from "socket.io";
import { setID } from "./roomRepository.js";
const PORT = 3333;
const io = new Server(PORT, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const roomRepository = [];
const roomID = [];
const chatRepository = {};
//클라이언트에서 유저 접속 했을 때 이벤트 발생
io.on("connection", (socket) => {
  const ip = socket.handshake.address;
  console.log(`${ip} 입장`);
  console.log(`server on => http://localhost:${PORT}`);
  /*클라이언트에서 유저가 접속시
  서버에 저장되어있는 방들의 데이터 배열을 전송*/
  socket.emit("initialize", [roomRepository, chatRepository]);
  // 채팅메세지 수신
  socket.on("chat-request", (msg) => {
    const { id, user, date, text } = msg;
    const data = { user: user, date: date, text: text };
    if (chatRepository[id] === undefined) chatRepository[id] = [];
    chatRepository[id].push(data);
    // 채팅메세지 송신
    socket.emit("chat-response", chatRepository);
  });
  // 클라이언트에서 방 생성 요청
  socket.on("newRoom", (room) => {
    room.id = setID(roomID);
    if (room.id === -1) {
      console.log("overflow: 방 생성 실패");
      return false;
    }
    roomRepository.push(room);
    roomID.push(room.id);
    console.log(room);
    // 서버에서 방 생성 응답
    socket.emit("rooms", roomRepository);
  });
  //채팅방에 유저 입장
  socket.on("enter-room", (data) => {
    console.log(data.id);
  });
});
