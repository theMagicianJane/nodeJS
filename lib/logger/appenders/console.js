import {getFormattedContent} from "./utils.js";

function log(date, level, category, message) {
  console.log(formatMessage(date, level, category, message));
}

function formatMessage(date,level, category, message) {
  return getFormattedContent({date,level, category, message});
}


export default {log}