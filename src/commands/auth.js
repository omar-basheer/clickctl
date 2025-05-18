const express = require("express");
const open = require("open");
const chalk = require("chalk");
const axios = require("axios");
const tokenStore = require("../tokenStore");
const utils = require("../utils");
require("dotenv").config();

const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}/callback` || process.env.REDIRECT_URI;
const CLIENT_ID = process.env.CLICKUP_CLIENT_ID;

async function authenticate(){
    if (!CLIENT_ID){
        console.error(chalk.red("❌ Missing CLICKUP_CLIENT_ID or CLICKUP_CLIENT_SECRET in .env file"));
        return;
    }

    // Define app and server
    const app = express()
    const server = app.listen(PORT, async () => {
        const authUrl = `https://app.clickup.com/api?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
        console.log(chalk.blue(`\n🌍 Opening browser for authentication...\n`));
        try {
            const open = (await import('open')).default;
            await open(authUrl);
        } catch (err) {
            console.error(chalk.red("❌ Failed to open browser:", err.message));
        }
    });

    // Handle the callback from ClickUp
    app.get("/callback", async (req, res) => {
        const code = req.query.code;
        if (!code){
            res.status(400).send ("❌ No code provided");
            return utils.shutdown(server,1)
        }

        try{
            const response = await axios.post("https://api.clickup.com/api/v2/oauth/token", {
                client_id: CLIENT_ID,
                client_secret: process.env.CLICKUP_CLIENT_SECRET,
                code: code,
                redirect_uri: REDIRECT_URI
            })
            const token = response.data.access_token;
            tokenStore.saveToken(token);

            res.send("✅ Authentication successful! You can close this window.");
            console.log(chalk.green("✅ Token saved successfully!"));
            utils.shutdown(server,0)
        }
        catch (err){
            console.error(chalk.red("❌ Failed to authenticate:", err.response?.data || err.message));
            res.status(500).send("❌ Authentication failed");
            utils.shutdown(server, 1)
        }
    })



}

module.exports = {
    authenticate,
}