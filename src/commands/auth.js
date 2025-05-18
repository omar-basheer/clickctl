const express = require("express");
const chalk = require("chalk");
const axios = require("axios");
const os = require("os");
const path = require("path");
const fs = require("fs");
const tokenStore = require("../tokenStore");
const utils = require("../utils");
require("dotenv").config();

const ENV_PATH = path.join(os.homedir(), ".clickctl.env");
const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;


// Authenticate user with ClickUp using OAuth
async function authenticate(options = {}) {
    // Load environment variables from ~/.clickctl.env if it exists
    if (fs.existsSync(ENV_PATH)) {
        require("dotenv").config({path: ENV_PATH});

    }
    else if (options.clientId && options.clientSecret) {
        // If provided through cli, save and load
        utils.saveEnvVars(ENV_PATH, options.clientId, options.clientSecret);
    }
    else {
        // Missing credentials
        console.error(chalk.red("❗ Missing credentials"));
        console.error(
            chalk.yellow("💡 Run the command with:\n") +
            chalk.cyan("clickctl auth --client-id <your-client-id> --client-secret <your-client-secret>")
        );
        return
    }

    const CLIENT_ID = process.env.CLICKUP_CLIENT_ID;
    const CLIENT_SECRET = process.env.CLICKUP_CLIENT_SECRET;

    // Define app and server
    const app = express()

    const server = app.listen(PORT, async () => {
        const authUrl = `https://app.clickup.com/api?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
        console.log(chalk.blue(`\n🌍 Opening browser for authentication...\n`));
        await utils.openBrowser(authUrl);
    });

    // Handle the callback from ClickUp
    app.get("/callback", async (req, res) => {
        const code = req.query.code;
        if (!code) {
            res.status(400).send("❗ No code provided");
            return utils.shutdown(server, 1)
        }

        try {
            const response = await axios.post("https://api.clickup.com/api/v2/oauth/token", {
                client_id    : CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code         : code,
                redirect_uri : REDIRECT_URI
            })

            const token = response.data.access_token;
            tokenStore.saveToken(token);

            res.send("✅ Authentication successful! You can close this window.");
            console.log(chalk.green("✅ Token saved successfully!"));
            utils.shutdown(server, 0)
        }
        catch (err) {
            console.error(chalk.red("❗ Failed to authenticate:", err.response?.data || err.message));
            res.status(500).send("❗ Authentication failed");
            utils.shutdown(server, 1)
        }
    })

}

module.exports = {
    authenticate,
}