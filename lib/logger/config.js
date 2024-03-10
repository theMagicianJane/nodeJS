import fs from 'fs';
import * as constants from "./constants.js";


const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appenders: [constants.appender.CONSOLE],
    formatData: { format: constants.format.DEFAULT, delimetter: ', '},
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
    const appenders =  file?.appenders || process.env.LOG_APPENDER?.toUpperCase();

    config.logLevel = logLevel || config.logLevel;
    config.appenders = appenders ? appenders.split(',') : config.appenders;
    config.formatData = {
        format: process.env.LOG_FORMAT?.toUpperCase() || defaultConfig.formatData.format,
        delimetter: process.env.LOG_DELIMETTER?.toUpperCase() || defaultConfig.formatData.delimetter
    };

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;
