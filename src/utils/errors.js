const chalk = require("chalk");

// Error handling utility for API requests
function handleApiError(err, context = "Unknown error") {
    console.error(chalk.red(`\n${context}`));

    if (err.response) {
        const { status, data } = err.response;

        switch (status) {
            case 401:
                console.error(chalk.yellow("Unauthorized – please check that you are passing the right ID or login again."));
                break;
            case 404:
                console.error(chalk.yellow("Not found – the ID you provided may be incorrect."));
                break;
            default:
                console.error(chalk.red(`Status: ${status}`));
                console.error(chalk.red("Message:", data?.err || err.response.statusText));
        }
    } else {
        console.error(chalk.red(err.message));
    }
}

module.exports = {
    handleApiError
}