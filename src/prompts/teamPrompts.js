const inquirer = require('inquirer');

// Prompt user to select a team from the list of teams
async function promptTeamSelection(teams) {
    const {selectedTeamId} = await inquirer.prompt([{
        type   : 'list',
        name   : 'selectedTeamId',
        message: 'Select a team:',
        choices: teams.map(team => ({
            name : team.name,
            value: team.id
        })),
    }]);

    return teams.find(team => team.id === selectedTeamId);
}

module.exports = {
    promptTeamSelection,
}