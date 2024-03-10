import http from 'http';
import net from 'net';
import config from '../config.js';
import {getFormattedContent} from "./utils.js";


let globalLogs = []

const server = http.createServer((req, res) =>  {
  const {url, method} = req;

  if (method === 'GET' && url ==='/logs') {
    res.write(JSON.stringify(globalLogs.map(log => JSON.parse(log))))
    res.statusCode = 200;
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.statusCode = 404;
    res.write('404')
  }
  res.end()
});

const socketServer = net.createServer((req, res) => {
  res.end()
})


function log(date, level, category, message) {
  server.listen(config.port, config.hostname, () => {
    console.log(`Server is running on http://${config.hostname}:${config.port}`);
  });

  socketServer.listen(5000, config.hostname, () => {
    globalLogs.push(getFormattedContent({date, level, category, message}))

    console.log('Socket server started')
  })
}



export default {log}