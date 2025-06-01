const clickup = require("../services/clickup");
const logger = require("../utils/logger");
const {promptTeamSelection} = require("../prompts/teamPrompts");
const {handleApiError} = require("../utils/errors");

// View teams a user has access to
async function getTeams() {
    try {
        const teams = await clickup.fetchTeams();
        if (!teams) {
            logger.warn("No teams found.")
            return;
        }

        const selectedTeam = await promptTeamSelection(teams);
        logger.success(`\nTeam Selected:\n`, {
            id  : selectedTeam.id,
            name: selectedTeam.name
        });
    }
    catch (err) {
        handleApiError(err, "Failed to fetch teams")
    }
}

module.exports = {
    getTeams,
}