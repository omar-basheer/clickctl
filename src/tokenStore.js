const fs = require("fs");
const path = require("path");
const os = require("os");

const TOKEN_DIR = path.join(os.homedir(), ".clickctl");
const TOKEN_PATH = path.join(TOKEN_DIR, "token.json");

function ensureTokenDirExists() {
    if (!fs.existsSync(TOKEN_DIR)) {
        fs.mkdirSync(TOKEN_DIR, { recursive: true });
    }
}

function saveToken(tokenData) {
    ensureTokenDirExists();
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2));
}

function loadToken() {
    if (fs.existsSync(TOKEN_PATH)) {
        const data = fs.readFileSync(TOKEN_PATH, "utf8");
        return JSON.parse(data);
    }
    return null;
}

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