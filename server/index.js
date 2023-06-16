import { Server } from "socket.io";
import os from "os";

const PORT = 3333;
const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const RoomRepository= [];

io.on("connection", (socket) => {
  const ip = socket.handshake.address;
  console.log(`${ip} 입장`);
  console.log(`server on => http://localhost:${PORT}`);
  // send a message to the client
  const resData = "";
  socket.emit("response", resData);

  // receive a message from the client
  socket.on("request", (data) => {
    console.log(data);
  });
  socket.on("newRoom", (data) => {
    console.log(data);
    RoomRepository.push(data);
    socket.join
  });
});
