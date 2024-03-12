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

socketServer.on('connection', socket => {
  console.log("Socket server connected");

  socket.on('data', (data) => {

    globalLogs.push(JSON.parse(data.toString()))
  });
})

socketServer.listen(5000, config.hostname, () => {
  console.log('Socket server started')
})


server.listen(config.port, config.hostname, () => {
  console.log(`Server is running on http://${config.hostname}:${config.port}`);
});





server.on("error", err=> console.log(err));