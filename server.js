import http from "http";
import config from "./lib/logger/config.js";
import net from "net";

let globalLogs = []

const server = http.createServer((req, res) =>  {
  const {url, method} = req;

  if (method === 'GET' && url ==='/logs') {
      res.write(JSON.stringify(globalLogs))
      res.statusCode = 200;
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.statusCode = 404;
    res.write('404')
  }

  res.end()
  server.close()
});

const socketServer = net.createServer(() => {})

let data = '';
socketServer.on('connection', socket => {
  console.log("Socket server connected");

  socket.on('data', (chunk) => {
    data += chunk.toString()
    data.split('\n')
      .filter(i => Boolean(i))
      .map(dataChunk => globalLogs.push(JSON.parse(dataChunk)))
  });
})

socketServer.listen(5000, config.hostname, () => {
  console.log('Socket server started')
})

server.listen(config.port, config.hostname, () => {
  console.log(`Server is running on http://${config.hostname}:${config.port}`);
});

server.on("error", err=> console.log(err));