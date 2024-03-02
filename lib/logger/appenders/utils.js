import config from "../config.js";
import {format} from "../constants.js";

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
    [format.CSV]: `app_${createDate(content.date)}.csv`
  })
}

function getFormattedContent (content) {
  return ({[format.DEFAULT]: getDefaultMessage(content),
    [format.JSON]: JSON.stringify(content),
    [format.CSV]: Object.values(content)
  })[config.formatData.format.toUpperCase()]
}

export {getFormattedContent, getFileName, getDefaultMessage, createDate}