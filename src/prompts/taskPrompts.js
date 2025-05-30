const inquirer = require('inquirer');

// Prompt user to select a task from a list
async function promptTaskSelection(tasks) {
    const {selectedTaskId} = await inquirer.prompt({
        type   : "list",
        name   : "selectedTaskId",
        message: "Select a task:",
        choices: tasks.map(task => ({
            name: `${task.name} ${task.status?.status ? `(${task.status.status.toUpperCase()})` : ""}`,
            value: task.id,
        }))
    });

    return tasks.find(task => task.id === selectedTaskId)
}

// Prompt user to select multiple tasks from a list
async function promptMultipleTaskSelection(tasks) {
    const { selectedTaskIds } = await inquirer.prompt({
        type: "checkbox",
        name: "selectedTaskIds",
        message: "Select tasks to update:",
        choices: tasks.map(task => ({
            name: `${task.name} (${task.status?.status.toUpperCase() || "No status"})`,
            value: task.id
        }))
    });

    return tasks.filter(task => selectedTaskIds.includes(task.id));
}

module.exports = {
    promptTaskSelection,
    promptMultipleTaskSelection
}