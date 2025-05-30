const chalk = require("chalk");

// Logger utility for consistent logging across the application
const logger = {
    info   : (message) => console.log(chalk.blue(message)),
    success: (message, data = null) => {
        console.log(chalk.green(message));
        if (data) console.log(data);
    },
    warn   : (message) => console.log(chalk.yellow(message)),
    error  : (message) => console.error(chalk.red(message)),
    debug  : (message) => console.debug(chalk.gray(message)),
    raw    : (message) => console.log(message),
}

module.exports = logger;