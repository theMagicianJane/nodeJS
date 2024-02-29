import config from "./config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js";


const logger = (category) => ({
    info: (...args) => {
        executeLog(level.INFO, category, args.join(config.formatData.delimetter))
    },
    warn: (...args) => {
        executeLog(level.WARN, category, args.join(config.formatData.delimetter))
    },
    error: (...args) => {
        executeLog(level.ERROR, category, args.join(config.formatData.delimetter))
    },
    trace: (...args) => {
        executeLog(level.TRACE, category, args.join(config.formatData.delimetter))
    },
    debug: (...args) => {
        executeLog(level.DEBUG, category, args.join(config.formatData.delimetter))
    }
});

const appenders = appenderStrategy.getAppenders();

function executeLog(level, category, message) {
    console.log(message)
    if (scoreLevel[level] <= config.scoreLevel) {
        appenders.map(appender => appender.log(Date.now(), level, category, message));
    }
}

export default {
    getLogger(category) {
        return logger(category);
    }
};
