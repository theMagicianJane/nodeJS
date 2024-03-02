import fs from "fs";
import { level as levelConstants, format } from "../constants.js";
import { getFileName, getFormattedContent } from "./utils.js";
import config from "../config.js";

const appErrorPath = './app_error.js';

function log(date, level, category, message){
  writeFile({date, level, category, message},
    `${getFileName({date, level, category, message})[config.formatData.format]}`)

  if (level === levelConstants.ERROR) {
    writeFile({date, level, category, message}, appErrorPath)
  }
}

async function writeFile(content, path) {
  const isFileExist = fs.existsSync(`${getFileName(content)[config.formatData.format]}`);
  const header = !isFileExist && config.formatData.format === format.CSV ? Object.keys(content) + '\n' : '';

  await fs.appendFile(path, `${header}${getFormattedContent(content)}\n`, err => {
    if (err) {
      console.error(err);
    }
  });
}

export default {log}