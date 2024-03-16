import net from "net";
import {getFormattedContent} from "./utils.js";

let client;

function log(date, level, category, message) {
  client.write(`${getFormattedContent({date, level, category, message})}\n`);
}

function init () {
  client = net.connect({port: 5000}, () => {
    console.log("Client connected");
  });

  process.on("exit", () => {
    client.end();
  });

  client.on("error", () => {
    console.log("Error");
    client.end();
  });

  return {log: log}
}

export default {init}