import net from "net";
import {getFormattedContent} from "./utils.js";


function log(date, level, category, message) {
  const client = net.connect({port: 5000}, () => {
    client.write(JSON.stringify(getFormattedContent({date, level, category, message})));
  })
}
export default {log}