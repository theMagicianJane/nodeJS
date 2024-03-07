import config from "./config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js";
import eventEmitter from './eventEmitter.js';


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
    const content = {date: Date.now(), level, category, message: message.join(config.formatData.delimetter)}

    if (scoreLevel[level] <= config.scoreLevel) {
        appenders.forEach(() => eventEmitter.emit(`log`, content))
    }
}

export default {
    getLogger(category) {
        return logger(category);
    }
};
