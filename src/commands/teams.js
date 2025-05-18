const chalk = require("chalk");
const api = require("../api");

// View teams a user has access to
async function getTeams(){
    try{
        const response = await api.get(`/team`);
        const teams = response.data.teams;

        if (!teams.length){
            console.log(chalk.yellow("⚠️  No teams found."));
            return;
        }

        console.log(chalk.blue(`\nTeams:\n`));
        teams.forEach((team, index) => {
            console.log(
                `${chalk.blue(index + 1 + ".")}${chalk.bold(chalk.blue(team.name))}\n` +
                `   🔑 ID: ${team.id}\n`
            );
        });
    }
    catch (err){
        console.error(chalk.red("❗️ Failed to fetch teams."));

        if (err.response){
            const {status, data} = err.response;

            if (status === 401){
                console.error(chalk.red("⚠️  Unauthorized. Make sure the space ID is correct and belongs to your workspace."));
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
    getTeams,
}