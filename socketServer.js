import net from "net";

export const socketServer = net.createServer((req, res) => {
  res.end()
})