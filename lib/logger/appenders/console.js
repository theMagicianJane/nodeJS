import config from "../config.js";


function log(date, level, category, message) {
  console.log(formatMessage(date, level, category, message));
  config.stream.on('finish', () => {
    console.log('Finished')

    config.stream.close()
  })
}

function formatMessage(date,level, category, message) {
  return `Date: ${date}, category:${category}, level:${level}, message:${JSON.stringify(message)}`;
}


export default {log}