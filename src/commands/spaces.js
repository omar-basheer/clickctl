const logger = require("../utils/logger");
const clickup = require("../services/clickup");
const {handleApiError} = require("../utils/errors");
const {promptSpaceSelection} = require("../prompts/spacePrompts");

// View spaces in a team
async function getSpaces({teamId}) {
    if (!teamId) {
        logger.error("Missing required --team-id option");
        return;
    }

    try {
        const spaces = await clickup.fetchSpaces(teamId);
        if (!spaces) {
            logger.warn("No spaces found for this team.");
            return;
        }

        const selectedSpace = await promptSpaceSelection(spaces);
        logger.success("Space selected:", {
            id  : selectedSpace.id,
            name: selectedSpace.name,
        });
    }
    catch (err) {
        handleApiError(err, "Failed to fetch spaces");
    }
}

module.exports = {
    getSpaces,
}