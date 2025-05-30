const chalk = require("chalk");
const api = require("../services/api");

// View teams a user has access to
async function fetchTeams() {
    const response = await api.get(`/team`);
    return response.data.teams;
}

async function fetchSpaces(teamId) {
    const response = await api.get(`/team/${teamId}/space`);
    return response.data.spaces;
}

async function fetchFolders(spaceId){
    const response = await api.get(`/space/${spaceId}/folder`)
    return response.data.folders
}

async function fetchListsInFolder(folderId){
    const response = await api.get(`/folder/${folderId}/list`)
    return response.data.lists
}

async function fetchListsInSpace(spaceId) {
    const res = await api.get(`/space/${spaceId}/list`);
    return res.data.lists;
}

async function fetchTasks(listId){
    const response = await api.get(`/list/${listId}/task`)
    return response.data.tasks
}

async function updateTaskStatus(taskId, status) {
    const response = await api.put(`/task/${taskId}`, { status });
    return response.data;
}

module.exports = {
    fetchTeams,
    fetchSpaces,
    fetchFolders,
    fetchListsInFolder,
    fetchListsInSpace,
    fetchTasks,
    updateTaskStatus
}