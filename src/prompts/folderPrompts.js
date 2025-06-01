const inquirer = require('inquirer');

// Prompt user to select a folder from the list of folders
async function promptFolderSelection(folders) {
    const {selectedFolderId} = await inquirer.prompt([
        {
            type   : 'list',
            name   : 'selectedFolderId',
            message: 'Select a folder:',
            choices: folders.map(folder => ({
                name : folder.name,
                value: folder.id
            })),
        }
    ]);

    return folders.find(folder => folder.id === selectedFolderId);
}

module.exports = {
    promptFolderSelection
}