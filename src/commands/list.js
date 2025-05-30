const logger = require("../utils/logger");
const clickup = require("../services/clickup");
const {handleApiError} = require("../utils/errors");
const {promptListSelection} = require("../prompts/listPrompts");

// View the lists within a folder
async function getLists({ folderId }) {
    if (!folderId) {
        logger.error("Missing required --folder-id option");
        return;
    }

    try {
        const lists = await clickup.fetchListsInFolder(folderId);
        if (!lists) {
            logger.warn("No lists found for this folder.");
            return;
        }

        const selectedList = await promptListSelection(lists);
        logger.success("List selected:", {
            id: selectedList.id,
            name: selectedList.name,
            taskCount: selectedList.task_count || "No tasks under this list"
        });
    } catch (err) {
        handleApiError(err, "Failed to fetch lists");
    }
}


module.exports = {
    getLists,
};