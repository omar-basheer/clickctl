const chalk = require("chalk");
const api = require("../api");

// View folders in a workspace
async function getFolders({spaceId}){
    if (!spaceId){
        console.error(chalk.red("❗ Missing required --space-id option"));
        return;
    }

    try{
        const response = await api.get(`/space/${spaceId}/folder`);
        const folders = response.data.folders;

        if (!folders.length){
            console.log(chalk.yellow("No folders found for this space."));
            return;
        }

        console.log(chalk.blue(`\nFolders in space ${spaceId}:\n`));
        folders.forEach((folder, index) => {
            console.log(
                `${chalk.blue(index + 1 + ".")}${chalk.bold(chalk.blue(folder.name))}\n` +
                `   🔑 ID: ${folder.id}\n` +
                `   📋 Task Count: ${chalk.cyan(folder.task_count ? folder.task_count : "No tasks under this folder")}\n`
            );
        });
    }

    catch (err){
        console.error(chalk.red("❗️ Failed to fetch folders."));

        if (err.response){
            const {status, data} = err.response;

            if (status === 401){
                console.error(chalk.red("❗️ Unauthorized. Make sure the space ID is correct and belongs to your workspace."));
                console.error(chalk.yellow("💡 Tip: Did you accidentally pass a workspace ID instead of a space ID?"));
            } else if (status === 404){
                console.error(chalk.red("❗ Not found. The space ID might be incorrect."));
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
    getFolders,
}