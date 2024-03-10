import {getFileName, getFormattedContent, getHeader} from "./utils.js";
import config from "../config.js";
import fs from "fs";
import { level as levelConstants } from "../constants.js";
import {Transform} from "stream";


const appErrorPath = './app_error.js';


function log(date, level, category, message){
  writeFile({date, level, category, message},
    `${getFileName({date, level, category, message})[config.formatData.format]}`)

  if (level === levelConstants.ERROR) {
    writeFile({date, level, category, message}, appErrorPath)
  }
}

async function writeFile(content, filepath) {
  const writeStream = await fs.createWriteStream(filepath, {encoding: "utf8", flags: 'a'});
  writeStream.write(`${getHeader(content)}${getFormattedContent(content)}\n`);

  const readStream = await fs.createReadStream(filepath, {encoding: "utf8"})

  const transformData = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString())
    },
  });

  readStream
    .pipe(transformData)
    .pipe(writeStream)
    .on('finish', () => {
      readStream.close()
  });
}

export default {log}