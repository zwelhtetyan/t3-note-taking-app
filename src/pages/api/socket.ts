import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!res.socket.server.io) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  res.end();
}
