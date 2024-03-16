const level = {
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    TRACE: "TRACE",
    DEBUG: "DEBUG"
}

const scoreLevel = {
    [level.ERROR]: 1,
    [level.WARN]: 2,
    [level.INFO]: 3,
    [level.TRACE]: 4,
    [level.DEBUG]: 5,
}

const appender = {
    CONSOLE: "CONSOLE",
    FILE: "FILE",
    NETWORK: "NETWORK",
}

const format = {
    DEFAULT: 'DEFAULT',
    JSON: 'JSON',
    CSV: 'CSV',
}

export {level, scoreLevel, appender, format}
