const inquirer = require('inquirer');
const logger = require('../utils/logger');
const dayjs = require('dayjs');
const {formatDate, getStatusColor, groupTasksByStatus, sortedTasks} = require('../utils/helpers');

// Prompt user to select a task from a list
// async function promptTaskSelection(tasks) {
//     const sorted = sortedTasks(tasks);
//
//     const { selectedTaskId } = await inquirer.prompt({
//         type: "list",
//         name: "selectedTaskId",
//         message: "Select a task:",
//         choices: sorted.map((task, index) => {
//             const statusText = task.status?.status?.toUpperCase() || "No status";
//             const statusColor = task.status?.color || "#aaaaaa";
//             const colorFn = getStatusColor(statusColor);
//
//             const dueText = task.due_date ? formatDate(task.due_date) : "No due date";
//
//             return {
//                 name: `${index + 1}. ${task.name} [${colorFn(statusText)}] - ${dueText}`,
//                 value: task.id,
//             };
//         }),
//     });
//
//     return tasks.find(task => task.id === selectedTaskId);
// }
async function promptTaskSelection(tasks) {
    const grouped = groupTasksByStatus(tasks);
    const choices = [];

    for (const status of Object.keys(grouped).sort()) {
        const colorFn = getStatusColor(grouped[status][0].status?.color || "#aaaaaa");
        choices.push(new inquirer.Separator(`\n${colorFn(`--- ${status} ---`)}`));

        grouped[status].forEach((task, index) => {
            const dueText = task.due_date ? formatDate(task.due_date) : "No due date";
            choices.push({
                name: `  ${task.name} - ${dueText}`,
                value: task.id,
            });
        });
    }

    const { selectedTaskId } = await inquirer.prompt({
        type: "list",
        name: "selectedTaskId",
        message: "Select a task:",
        choices
    });

    return tasks.find(task => task.id === selectedTaskId);
}

// Prompt user to select multiple tasks from a list
async function promptMultipleTaskSelection(tasks) {
    const {selectedTaskIds} = await inquirer.prompt({
        type   : "checkbox",
        name   : "selectedTaskIds",
        message: "Select tasks to update:",
        choices: tasks.map(task => ({
            name : `${task.name} (${task.status?.status.toUpperCase() || "No status"})`,
            value: task.id
        }))
    });

    return tasks.filter(task => selectedTaskIds.includes(task.id));
}

// Prompt user to select an action for a task
async function promptTaskAction() {
    const {action} = await inquirer.prompt({
        type   : "list",
        name   : "action",
        message: "What would you like to do?",
        choices: [
            {name: "Update status", value: "status"},
            {name: "Update due date", value: "due_date"},
            {name: "Select another task", value: "another"},
            {name: "Exit", value: "exit"}
        ]
    });

    return action;
}

// Prompt user to update task status
async function promptUpdateTaskStatus(validStatuses) {
    const {status} = await inquirer.prompt([
        {
            type   : "list",
            name   : "status",
            message: "Select new status",
            choices: validStatuses,
        }
    ]);
    return status;
}

// Prompt user to update task due date
async function promptUpdateTaskDueDate() {
    const {dueDate} = await inquirer.prompt([
        {
            type   : "input",
            name   : "dueDate",
            message: "Enter new due date (YYYY-MM-DD):",
        }
    ]);

    const timestamp = dayjs(dueDate).valueOf();
    return isNaN(timestamp) ? null : timestamp;
}

module.exports = {
    promptTaskSelection,
    promptMultipleTaskSelection,
    promptTaskAction,
    promptUpdateTaskStatus,
    promptUpdateTaskDueDate
}