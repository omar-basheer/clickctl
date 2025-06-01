const api = require("../services/api");

// View teams a user has access to
async function fetchTeams() {
    const response = await api.get(`/team`);
    return response.data.teams;
}

// View spaces in a team
async function fetchSpaces(teamId) {
    const response = await api.get(`/team/${teamId}/space`);
    return response.data.spaces;
}

// View folders in a space
async function fetchFolders(spaceId){
    const response = await api.get(`/space/${spaceId}/folder`)
    return response.data.folders
}

// View lists in a folder
async function fetchListsInFolder(folderId){
    const response = await api.get(`/folder/${folderId}/list`)
    return response.data.lists
}

// View lists in a space
async function fetchListsInSpace(spaceId) {
    const res = await api.get(`/space/${spaceId}/list`);
    return res.data.lists;
}

// View tasks in a list
async function fetchTasks(listId){
    const response = await api.get(`/list/${listId}/task`)
    return response.data.tasks
}

// Fetch statuses for a list
async function fetchStatuses(listId){
    const res = await api.get(`/list/${listId}`);
    return res.data.statuses.map(s => s.status);
}

// Update task details
async function updateTaskDetails(taskId, details) {
    const response = await api.put(`/task/${taskId}`, details);
    return response.data;
}

module.exports = {
    fetchTeams,
    fetchSpaces,
    fetchFolders,
    fetchListsInFolder,
    fetchListsInSpace,
    fetchTasks,
    updateTaskDetails,
    fetchStatuses
}