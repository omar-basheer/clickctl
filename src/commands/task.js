const chalk = require("chalk");
const api = require("../api");
const {formatDate} = require("../utils");


// View tasks within a list
async function getTasks({listId}){
    if (!listId) {
        console.error(chalk.red("❗️ Missing required --list-id option"));
        return;
    }

    try{
        const response = await api.get(`/list/${listId}/task`);
        const tasks = response.data.tasks;

        if (!tasks.length) {
            console.log(chalk.yellow("No tasks found for this list."));
            return;
        }

        console.log(chalk.blue(`\nTasks in list ${listId}:\n`));
        tasks.forEach((task, index) => {
            const statusColor = task.status?.color || "#ffffff";
            const statusName = task.status?.status?.toUpperCase() || "No status";

            const priority = task.priority ? task.priority.name.toUpperCase() : "No priority";
            const startDate = formatDate(task.start_date);
            const dueDate = formatDate(task.due_date);
            const dateRange = startDate && dueDate
                ? `${startDate} → ${dueDate}`
                : startDate
                    ? `Starts: ${startDate}`
                    : dueDate
                        ? `Due: ${dueDate}`
                        : "No date info";
            const assignees = task.assignees.length > 0
                ? task.assignees.map(a => chalk.hex(a.color || "#ffffff")(a.username)).join(", ")
                : "Unassigned";

            console.log(
                `${chalk.blue(index + 1 + ".")}${chalk.bold(chalk.blue(task.name))}\n` +
                `   🔑 ID: ${task.id}\n` +
                `   🚥 Status: ${chalk.hex(statusColor)(statusName)}\n` +
                `   📌 Priority: ${chalk.cyan(priority)}\n` +
                `   📅 Date: ${chalk.cyan(dateRange)}\n` +
                `   📋 Assignee(s): ${assignees}\n`
            );
        });
    }
    catch (err) {
        console.error(chalk.red("❗️ Failed to fetch tasks."));

        if (err.response) {
            const { status, data } = err.response;

            if (status === 401) {
                console.error(chalk.red("❗️  Unauthorized. Make sure the list ID is correct and belongs to your a list in your workspace."));
                console.error(chalk.yellow("💡 Tip: Did you accidentally pass a folder ID instead of a list ID?"));
            } else if (status === 404) {
                console.error(chalk.red("❗️ Not found. The list ID might be incorrect."));
            } else {
                console.error("Status:", status);
                console.error("Message:", data.err || err.response.statusText);
            }
        } else {
            console.error(err.message);
        }
    }
}

// Update properties of a task
async function updateTask({taskId, status, priority, startDate, dueDate, name}){
    if (!taskId){
        console.error(chalk.red("❗️ Missing required --task-id option"));
    }

    const updatePayload = {}
    if (status) updatePayload.status = status;
    if (priority) updatePayload.priority = priority;
    if (startDate) updatePayload.start_date = startDate;
    if (dueDate) updatePayload.due_date = dueDate;
    if (name) updatePayload.name = name;

    if (!Object.keys(updatePayload).length){
        console.log(chalk.yellow("⚠️  No updates specified."));
        return;
    }
    try{
        const response = await api.put(`/task/${taskId}`, updatePayload);
        console.log(chalk.green("✅ Task updated successfully!"));
    }
    catch (err) {
        console.error(chalk.red("❗️ Failed to update task."));

        if (err.response) {
            const { status, data } = err.response;

            if (status === 401) {
                console.error(chalk.red("❗️  Unauthorized. Make sure the task ID is correct and belongs to a folder in your workspace."));
                // console.error(chalk.yellow("💡 Tip: Did you accidentally pass a workspace ID instead of a folder ID?"));
            } else if (status === 404) {
                console.error(chalk.red("❗️ Not found. The task ID might be incorrect."));
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
    getTasks,
    updateTask
}