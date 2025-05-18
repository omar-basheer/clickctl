const axios = require("axios");
const {loadToken} = require("./tokenStore");

const token = loadToken()?.access_token;

const api = axios.create({
    baseURL: "https://api.clickup.com/api/v2/",
    headers: {
        Authorization: token ? token: "",
    },
});

module.exports = api;