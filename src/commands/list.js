const api = require("../api");
const chalk = require("chalk");

// View the lists within a folder
async function getLists({ folderId }) {
    if (!folderId) {
        console.error(chalk.red("❗ Missing required --folder-id option"));
        return;
    }

    try {
        const response = await api.get(`/folder/${folderId}/list`);
        // console.log(response.data)
        const lists = response.data.lists;

        if (!lists.length) {
            console.log(chalk.yellow("No lists found for this folder."));
            return;
        }

        console.log(chalk.blue(`\nLists in folder ${folderId}:\n`));
        lists.forEach((list, index) => {
            console.log(
                `${chalk.blue(index + 1 + ".")}${chalk.bold(chalk.blue(list.name))}\n` +
                `   🔑 ID: ${list.id}\n` +
                `   🎯 Task Count: ${chalk.cyan(list.task_count ? list.task_count : "No tasks under this list")}\n`
            );
        });
    } catch (err) {
        console.error(chalk.red("❗ Failed to fetch lists."));

        if (err.response) {
            const { status, data } = err.response;

            if (status === 401) {
                console.error(chalk.red("❗️ Unauthorized. Make sure the folder ID is correct and belongs to a folder in your workspace."));
                console.error(chalk.yellow("💡 Tip: Did you accidentally pass a workspace ID instead of a folder ID?"));
            } else if (status === 404) {
                console.error(chalk.red("❗ Not found. The folder ID might be incorrect."));
            } else {
                console.error("Status:", status);
                console.error("Message:", data.err || err.response.statusText);
            }
        } else {
            console.error(err.message);
        }
    }
}


module.exports = {
    getLists,
};