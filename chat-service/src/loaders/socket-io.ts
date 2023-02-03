import { createServer } from "http";
import socketio from "socket.io";

let io: socketio.Server;

export const establishSocketConnection = (app: any): socketio.Server => {
  const server = createServer(app);
  io = new socketio.Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });

    socket.on("sendMessage", (message) => {
      io.emit("receiveMessage", message);
    });
  });

  return io;
};

const getInstance = (): socketio.Server => {
  if (!io) throw Error("cannot get socket.io instance before initialization!");
  return io;
};

export default getInstance;

// Client code to be used for basic realtime talking:-

// import socketio from "socket.io-client";

// const socket = socketio("http://localhost:3000");

// socket.on("connect", () => {
//   console.log("Connected to the server");
// });

// socket.on("receiveMessage", (message) => {
//   console.log("Received message:", message);
// });

// // Send a message to the server
// socket.emit("sendMessage", "Hello from the client");
