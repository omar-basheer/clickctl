const chalk = require("chalk");
const api = require("../api");

// View spaces in a team
async function getSpaces({teamId}) {
    if (!teamId){
        console.error(chalk.red("❗ Missing required --team-id option"));
        return;
    }

    try{
        const response = await api.get(`/team/${teamId}/space`);
        const spaces = response.data.spaces;

        if (!spaces.length){
            console.log(chalk.yellow("⚠️ No spaces found for this team."));
            return;
        }

        console.log(chalk.blue(`\nSpaces in team ${teamId}:\n`));
        spaces.forEach((space, index) => {
            console.log(
                `${chalk.blue(index + 1 + ".")}${chalk.bold(chalk.blue(space.name))}\n` +
                `   🔑 ID: ${space.id}\n` );
        });
    }
    catch (err){
        console.error(chalk.red("❗️ Failed to fetch spaces."));

        if (err.response){
            const {status, data} = err.response;

            if (status === 401){
                console.error(chalk.red("❗️ Unauthorized. Make sure the team ID is correct and belongs to your workspace."));
                console.error(chalk.yellow("💡 Tip: Did you accidentally pass a workspace ID instead of a team ID?"));
            } else if (status === 404){
                console.error(chalk.red("❗ Not found. The team ID might be incorrect."));
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
    getSpaces,
}