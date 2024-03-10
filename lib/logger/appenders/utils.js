import config from "../config.js";
import {format} from "../constants.js";
import fs from "fs";


function createDate (date) {
  const dd = new Date(date).getDate();
  const mm = new Date(date).getMonth() + 1;
  const yyyy = new Date(date).getFullYear();

  return `${dd}_${mm}_${yyyy}`
}

const getDefaultMessage = content => typeof content === 'object' &&
  Object.entries(content).flat().join(config.formatData.delimetter);

function getFileName(content) {
  return ({
    [format.DEFAULT]: `app.log`,
    [format.JSON]: `app.log`,
    [format.CSV]: `app_${createDate(content?.date)}.csv`
  })
}

function getFormattedContent (content) {
  return ({[format.DEFAULT]: getDefaultMessage(content),
    [format.JSON]: JSON.stringify(content),
    [format.CSV]: Object.values(content)
  })[config.formatData.format.toUpperCase()]
}

const isFileExist = content => {
  const { formatData: { format: configFormat }} = config;

  fs.existsSync(`${getFileName(content)[configFormat]}`);
}

function getHeader(content){
  const configFormat = config.formatData.format;

  return !isFileExist(content) && configFormat === format.CSV ? Object.keys(content) + '\n' : '';
}

export {getFormattedContent, getFileName, getDefaultMessage, createDate, getHeader, isFileExist}