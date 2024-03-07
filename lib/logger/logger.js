import config from "./config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js";


const logger = (category) => ({
    info: (...args) => {
        executeLog(level.INFO, category, args)
    },
    warn: (...args) => {
        executeLog(level.WARN, category, args)
    },
    error: (...args) => {
        executeLog(level.ERROR, category, args)
    },
    trace: (...args) => {
        executeLog(level.TRACE, category, args)
    },
    debug: (...args) => {
        executeLog(level.DEBUG, category, args)
    }
});

const appenders = appenderStrategy.getAppenders();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        appenders.map(appender =>
          appender.log(Date.now(), level, category, message.join(config.formatData.delimetter)));
    }
}

export default {
    getLogger(category) {
        return logger(category);
    }
};
