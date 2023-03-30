import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("Client connected");

      // Listen for events from the client
      socket.on("hello", (data) => {
        console.log(data); // { name: 'John' }

        // Emit an event back to the client
        // socket.emit("world", { message: `Hello, ${data.name}!` });
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  res.status(200).json({ message: "connect to socket.io" });
  // res.end();
}
