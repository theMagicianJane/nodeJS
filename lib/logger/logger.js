import config from "./config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js";


const logger = (category) => ({
    info: (message) => {
        executeLog(level.INFO, category, message)
    },
    warn: (message) => {
        executeLog(level.WARN, category, message)
    },
    error: (message) => {
        executeLog(level.ERROR, category, message)
    },
    trace: (message) => {
        executeLog(level.TRACE, category, message)
    },
    debug: (message) => {
        executeLog(level.DEBUG, category, message)
    }
});

const appenders = appenderStrategy.getAppenders();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        appenders.map(appender => appender.log(Date.now(), level, category, message));
    }
}

export default {
    getLogger(category) {
        return logger(category);
    }
};
