import config from '../config.js';
import {getFormattedContent} from "./utils.js";
import {server, globalLogs} from '../../../server.js';
import {socketServer} from '../../../socketServer.js';


function log(date, level, category, message) {
  server.listen(config.port, config.hostname, () => {
    console.log(`Server is running on http://${config.hostname}:${config.port}`);
  });

  socketServer.listen(5000, config.hostname, () => {
    globalLogs.push(JSON.parse(getFormattedContent({date, level, category, message})))

    console.log('Socket server started')
  })
}



export default {log}