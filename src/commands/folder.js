const chalk = require("chalk");
const logger = require("../utils/logger");
const clickup = require("../services/clickup");
const {handleApiError} = require("../utils/errors");
const {promptFolderSelection} = require("../prompts/folderPrompts");

// View folders in a workspace
async function getFolders({spaceId}) {
    if (!spaceId) {
        logger.error("Missing required --space-id option");
        return;
    }

    try {
        const folders = await clickup.fetchFolders(spaceId);
        if (!folders) {
            logger.warn("No folders found for this space.");
            return;
        }

        const selectedFolder = await promptFolderSelection(folders);
        logger.success("Folder selected:", {
            id: selectedFolder.id,
            name: selectedFolder.name,
            taskCount: selectedFolder.task_count || "No tasks under this folder"
        });
    }
    catch (err) {
        handleApiError(err, "Failed to fetch folders");
    }
}

module.exports = {
    getFolders,
}