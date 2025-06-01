const inquirer = require('inquirer');

// Prompt user to select a space from the list of spaces
async function promptSpaceSelection(spaces) {
    const {selectedSpaceId} = await inquirer.prompt([
        {
            type   : 'list',
            name   : 'selectedSpaceId',
            message: 'Select a space:',
            choices: spaces.map(space => ({
                name : space.name,
                value: space.id
            })),
        }
    ]);

    return spaces.find(space => space.id === selectedSpaceId);
}

module.exports = {
    promptSpaceSelection,
};