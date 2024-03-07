import {getFormattedContent, getHeader} from "./utils.js";
import config from "../config.js";



function log(date, level, category, message){
  writeFile({date, level, category, message})
}

async function writeFile(content) {
  config.stream.write(`${getHeader(content)}${getFormattedContent(content)}\n`);

  config.stream.on('finish', () => {
    console.log('Finished')

    config.stream.close()
  })
}

export default {log}