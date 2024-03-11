import http from "http";

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

server.on("error", err=> console.log(err));

export {server, globalLogs}