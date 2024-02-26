import config from "./config.js";
import {scoreLevel, level, appender as appenderConst} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js";

const appLogPath = './app.log';
const appErrorPath = './app_error.js';

const logger = (category) => ({
    info: (message) => {
        loggerFunction(level.INFO, category, message, appLogPath);
    },
    warn: (message) => {
        loggerFunction(level.WARN, category, message, appLogPath);
    },
    error: (message) => {
        loggerFunction(level.ERROR, category, message, appLogPath, appErrorPath);
    },
    trace: (message) => {
        loggerFunction(level.TRACE, category, message, appLogPath);
    },
    debug: (message) => {
        loggerFunction(level.DEBUG, category, message, appLogPath);
    }
});

const appender = appenderStrategy.getAppender();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        appender.log(Date.now(), level, category, message);
    }
}

function loggerFunction(levelKey, category, message, appLogPath, appErrorPath){
    if (config.appender === appenderConst.FILE){
        writeFile(levelKey, category, message, appLogPath);

        if (levelKey === level.ERROR){
            writeFile(levelKey, category, message, appErrorPath);
        }

    } else if((config.appender === appenderConst.CONSOLE)){
        executeLog(levelKey, category, message);
    }
}

function writeFile(level, category, message, path){
    appender.fileAppender({level, category, message}, path);
}

export default {
    getLogger(category) {
        return logger(category);
    }
};
