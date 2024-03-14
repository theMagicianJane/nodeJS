import * as constants from "./constants.js";
import config from "./config.js";
import consoleAppender from "./appenders/console.js"
import fileAppender from "./appenders/file.js"
import networkAppender from "./appenders/network.js"


const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [constants.appender.NETWORK]: networkAppender.init(),
    [undefined]:consoleAppender
}
function getAppenders() {
    return config.appenders.map(appender => appenders[appender])
}

export {getAppenders}
