import * as constants from "./constants.js";

import fs from 'fs';

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function getDataFromFile(){
    if (process.env.LOG_CONFIG_FILE){
        return fs.readFileSync(process.env.LOG_CONFIG_FILE);
    }
}

function initConfig() {
    const config = defaultConfig;
    const file = getDataFromFile();

    const logLevel = file?.logLevel || process.env.LOG_LEVEL?.toUpperCase();
    const appender =  file?.appender || process.env.LOG_APPENDER?.toUpperCase();

    config.logLevel = logLevel || config.logLevel
    config.appender = appender || config.appender

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;
