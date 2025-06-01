const logger = require("../utils/logger");
const {handleApiError} = require("../utils/errors");
const {fetchTeams, fetchSpaces, fetchFolders, fetchListsInFolder, fetchListsInSpace, fetchTasks, updateTaskDetails, fetchStatuses} = require("../services/clickup");
const {promptTeamSelection} = require("../prompts/teamPrompts");
const {promptSpaceSelection} = require("../prompts/spacePrompts");
const {promptFolderSelection} = require("../prompts/folderPrompts");
const {promptListSelection} = require("../prompts/listPrompts");
const {promptTaskSelection, promptMultipleTaskSelection, promptTaskAction, promptUpdateTaskStatus, promptUpdateTaskDueDate} = require("../prompts/taskPrompts");
const {prompt} = require("inquirer");

// Interactive task browsing function
async function browseTasks() {
    try {
        const teams = await fetchTeams();
        const selectedTeam = await promptTeamSelection(teams)

        const spaces = await fetchSpaces(selectedTeam.id);
        const selectedSpace = await promptSpaceSelection(spaces)

        const folders = await fetchFolders(selectedSpace.id);
        let lists = [];

        if (folders.length > 0) {
            const selectedFolder = await promptFolderSelection(folders)
            lists = await fetchListsInFolder(selectedFolder.id);
        }
        else {
            logger.warn("No folders found — fetching lists directly under space.");
            lists = await fetchListsInSpace(selectedSpace.id);
        }

        if (!lists.length) {
            logger.warn("No lists found.");
            return;
        }

        const selectedList = await promptListSelection(lists)
        const validStatuses = await fetchStatuses(selectedList.id)


        let exit = false;
        while (!exit) {
            const tasks = await fetchTasks(selectedList.id);
            if (!tasks.length) {
                logger.warn("No tasks found.");
                return;
            }

            const selectedTask = await promptTaskSelection(tasks)

            logger.info("\nSelected Task:");
            logger.raw({
                id      : selectedTask.id,
                name    : selectedTask.name,
                status  : selectedTask.status?.status.toUpperCase() || "No status",
                due_date: selectedTask.due_date,
            });

            const action = await promptTaskAction()

            switch (action) {
                case "status":
                    await updateTaskStatusFlow(selectedTask.id, validStatuses);
                    break;
                case "due_date":
                    await updateTaskDueDateFlow(selectedTask.id);
                    break;
                case "another":
                    continue;
                case "exit":
                    exit = true;
                    break;
            }
        }
    }
    catch (err) {
        handleApiError(err, "Failed while browsing tasks");
    }
}

// Update task status flow
async function updateTaskStatusFlow(taskId, validStatuses) {
    const status = await promptUpdateTaskStatus(validStatuses)
    await updateTaskDetails(taskId, {status: status});
    logger.success(`Status updated`);
}

// Update task due date flow
async function updateTaskDueDateFlow(taskId) {
    const dueDate = await promptUpdateTaskDueDate();
    if (!dueDate) {
        logger.warn("Invalid date format. Skipping update.");
        return;
    }
    await updateTaskDetails(taskId, {due_date: dueDate});
    logger.success(`Due date updated.`);
}

// Update multiple tasks with a provided status
// async function updateTasks(status) {
//     try {
//         const teams = await fetchTeams();
//         const selectedTeam = await promptTeamSelection(teams);
//
//         const spaces = await fetchSpaces(selectedTeam.id);
//         const selectedSpace = await promptSpaceSelection(spaces);
//
//         const folders = await fetchFolders(selectedSpace.id);
//         let lists = [];
//
//         if (folders.length > 0) {
//             const selectedFolder = await promptFolderSelection(folders);
//             lists = await fetchListsInFolder(selectedFolder.id);
//         }
//         else {
//             logger.warn("No folders found — fetching lists directly under space.");
//             lists = await fetchListsInSpace(selectedSpace.id);
//         }
//
//         if (!lists.length) {
//             logger.warn("No lists found.");
//             return;
//         }
//
//         const selectedList = await promptListSelection(lists);
//         const tasks = await fetchTasks(selectedList.id);
//         if (!tasks.length) {
//             logger.warn("No tasks found.");
//             return;
//         }
//
//         const selectedTasks = await promptMultipleTaskSelection(tasks);
//         if (selectedTasks.length === 0) {
//             logger.warn("No tasks selected for update.");
//             return;
//         }
//         for (const task of selectedTasks) {
//             const updated = await updateTaskStatus(task.id, status);
//             if (!updated) {
//                 logger.error(`Failed to update task "${task.name}"`);
//                 continue;
//             }
//             logger.success(`Updated "${task.name}" to status "${status.toUpperCase()}"`);
//         }
//
//         logger.info("\nAll selected tasks updated.");
//
//     }
//     catch (err) {
//         handleApiError(err, "Failed to update tasks");
//     }
// }


// View tasks within a list
// async function getTasks({listId}) {
//     if (!listId) {
//         logger.error("Missing required --list-id option");
//         return;
//     }
//
//     try {
//         const tasks = await fetchTasks(listId);
//         if (!tasks) {
//             logger.warn("No tasks found for this list.");
//             return;
//         }
//
//         const selectedTask = await promptTaskSelection(tasks)
//         logger.info("\nSelected Task:");
//         logger.raw({
//             id      : selectedTask.id,
//             name    : selectedTask.name,
//             status  : selectedTask.status?.status.toUpperCase() || "No status",
//             due_date: selectedTask.due_date,
//         });
//
//         // console.log(chalk.blue(`\nTasks in list ${listId}:\n`));
//         // tasks.forEach((task, index) => {
//         //     const statusColor = task.status?.color || "#ffffff";
//         //     const statusName = task.status?.status?.toUpperCase() || "No status";
//         //
//         //     const priority = task.priority ? task.priority.name.toUpperCase() : "No priority";
//         //     const startDate = formatDate(task.start_date);
//         //     const dueDate = formatDate(task.due_date);
//         //     const dateRange = startDate && dueDate
//         //         ? `${startDate} → ${dueDate}`
//         //         : startDate
//         //             ? `Starts: ${startDate}`
//         //             : dueDate
//         //                 ? `Due: ${dueDate}`
//         //                 : "No date info";
//         //     const assignees = task.assignees.length > 0
//         //         ? task.assignees.map(a => chalk.hex(a.color || "#ffffff")(a.username)).join(", ")
//         //         : "Unassigned";
//         //
//         //     console.log(
//         //         `${chalk.blue(index + 1 + ".")}${chalk.bold(chalk.blue(task.name))}\n` +
//         //         `   🔑 ID: ${task.id}\n` +
//         //         `   🚥 Status: ${chalk.hex(statusColor)(statusName)}\n` +
//         //         `   📌 Priority: ${chalk.cyan(priority)}\n` +
//         //         `   📅 Date: ${chalk.cyan(dateRange)}\n` +
//         //         `   📋 Assignee(s): ${assignees}\n`
//         //     );
//         // });
//     }
//     catch (err) {
//         handleApiError(err, "Failed to fetch tasks for the list");
//     }
// }


// Update properties of a task
// async function updateTask({taskId, status, priority, startDate, dueDate, name}) {
//     if (!taskId) {
//         console.error(chalk.red("❗️ Missing required --task-id option"));
//     }
//
//     const updatePayload = {}
//     if (status) updatePayload.status = status;
//     if (priority) updatePayload.priority = priority;
//     if (startDate) updatePayload.start_date = startDate;
//     if (dueDate) updatePayload.due_date = dueDate;
//     if (name) updatePayload.name = name;
//
//     if (!Object.keys(updatePayload).length) {
//         console.log(chalk.yellow("⚠️  No updates specified."));
//         return;
//     }
//     try {
//         const response = await api.put(`/task/${taskId}`, updatePayload);
//         console.log(chalk.green("✅ Task updated successfully!"));
//     }
//     catch (err) {
//         console.error(chalk.red("❗️ Failed to update task."));
//
//         if (err.response) {
//             const {status, data} = err.response;
//
//             if (status === 401) {
//                 console.error(chalk.red("❗️  Unauthorized. Make sure the task ID is correct and belongs to a folder in your workspace."));
//                 // console.error(chalk.yellow("💡 Tip: Did you accidentally pass a workspace ID instead of a folder ID?"));
//             }
//             else if (status === 404) {
//                 console.error(chalk.red("❗️ Not found. The task ID might be incorrect."));
//             }
//             else {
//                 console.error("Status:", status);
//                 console.error("Message:", data.err || err.response.statusText);
//             }
//         }
//         else {
//             console.error(err.message);
//         }
//     }
// }

module.exports = {
    // getTasks,
    // updateTask,
    browseTasks,
    // updateTasks,
}