import * as constants from "./constants.js";
import config from "./config.js";
import consoleAppender from "./appenders/console.js"
import fileAppender from "./appenders/file.js"


const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]:consoleAppender
}
function getAppenders(){
    return config.appenders.includes(',')
      ? config.appenders.split(',').map(a => appenders[a])
      : [appenders[config.appenders]];
}

export {getAppenders}
