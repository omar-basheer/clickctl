const fs = require("fs");
const path = require("path");
const os = require("os");

const TOKEN_DIR = path.join(os.homedir(), ".clickctl");
const TOKEN_PATH = path.join(TOKEN_DIR, "token.json");

// Create the token directory if it doesn't exist
function ensureTokenDirExists() {
    if (!fs.existsSync(TOKEN_DIR)) {
        fs.mkdirSync(TOKEN_DIR, { recursive: true });
    }
}

// Save the token to a file
function saveToken(tokenData) {
    ensureTokenDirExists();
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2));
}

// Load the token from a file
function loadToken() {
    if (fs.existsSync(TOKEN_PATH)) {
        const data = fs.readFileSync(TOKEN_PATH, "utf8");
        return JSON.parse(data);
    }
    return null;
}

// Delete the token file
function deleteToken() {
    if (fs.existsSync(TOKEN_PATH)) {
        fs.unlinkSync(TOKEN_PATH);
    }
}

module.exports = {
    saveToken,
    loadToken,
    deleteToken,
    TOKEN_PATH
};