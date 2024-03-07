import * as constants from "./constants.js";
import config from "./config.js";
import consoleAppender from "./appenders/console.js"
import fileAppender from "./appenders/file.js"
import eventEmitter from "./eventEmitter.js";


const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]:consoleAppender
}
function getAppenders(){
    return [appenders[config.appenders]]
}

eventEmitter.on('log', (content = {}) => {
    const configAppenders = config.appenders;
    const [...contentValues] = Object.values(content);

    configAppenders.includes(',')
      ? configAppenders.split(',').map(a => appenders[a].log(...contentValues))
      : appenders[configAppenders].log(...contentValues);
});

export {getAppenders}
