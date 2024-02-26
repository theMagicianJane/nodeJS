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
}

export {level, scoreLevel, appender}
