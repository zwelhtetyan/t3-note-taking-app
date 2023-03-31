/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { NextApiRequest } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const io = new Server(res.socket.server);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.socket.server.io = io;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  res.end();
}
