require("dotenv").config();
const axios = require("axios");

const api = axios.create({
    baseURL: "https://api.clickup.com/api/v2/",
    headers: {
        Authorization: process.env.CLICKUP_API_TOKEN,
    },
});

module.exports = api;