import fs from "fs";
import { level as levelConstants, format } from "../constants.js";
import config from "../config.js";

const appErrorPath = './app_error.js';

function log(date, level, category, message){
  writeFile({date, level, category, message})

  if (level === levelConstants.ERROR) {
    writeFile({date, level, category, message}, appErrorPath)
  }
}

async function writeFile(content) {
  const isFileExist = fs.existsSync(`${getFileName(content)[config.formatData.format]}`);
  const header = !isFileExist && config.formatData.format === format.CSV ? Object.keys(content) + '\n' : ''

  await fs.appendFile(`${getFileName(content)[config.formatData.format]}`,
    `${header}${getFormattedContent(content)}\n`, err => {
    if (err) {
      console.error(err);
    }
  });
}

function getFormattedContent (content) {
  return ({[format.DEFAULT]: getDefaultMessage(content),
    [format.JSON]: JSON.stringify(content),
    [format.CSV]: Object.values(content)
  })[config.formatData.format.toUpperCase()]
}

function getFileName(content) {
  return ({
    [format.DEFAULT]: `app.log`,
    [format.JSON]: `app.log`,
    [format.CSV]: `app_${createDate(content.date)}.csv`
  })
}

function createDate (date) {
  const dd = new Date(date).getDate();
  const mm = new Date(date).getMonth() + 1;
  const yyyy = new Date(date).getFullYear();

  return `${dd}_${mm}_${yyyy}`
}

const getDefaultMessage = content => typeof content === 'object' &&
  Object.entries(content).flat().join(config.formatData.delimetter);

export default {log}