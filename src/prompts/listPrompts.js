const inquirer = require('inquirer');

// Prompt user to select a list from within a folder
async function promptListSelection(lists) {
    const {selectedListId} = await inquirer.prompt({
        type   : "list",
        name   : "selectedListId",
        message: "Select a list:",
        choices: lists.map(list => ({name: list.name, value: list.id})),
    });

    return lists.find(list => list.id === selectedListId)
}

module.exports = {
    promptListSelection
}