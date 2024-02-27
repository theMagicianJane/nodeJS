import fs from "fs";
import { level as levelConstants } from "../constants.js";

const appLogPath = './app.log';
const appErrorPath = './app_error.js';

function log(date, level, category, message){
  writeFile({date, level, category, message}, appLogPath)

  if (level === levelConstants.ERROR) {
    writeFile({date, level, category, message}, appErrorPath)
  }
}

function writeFile(content, path) {
  fs.appendFile(path, `\n${JSON.stringify(content)}`, err => {
    if (err) {
      console.error(err);
    }
  });
}

export default {log}