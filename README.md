# clickctl
[![GitHub](https://img.shields.io/badge/GitHub-Repo-blue?logo=github)](https://github.com/omar-basheer/clickctl)

A simple CLI tool for interacting with [ClickUp](https://clickup.com) tasks right from the terminal. Built with devs in mind 🤓. Now you can view and update your ClickUp tasks without leaving your terminal!


## ✨ Features
- 🌱 Authenticate with ClickUp using OAuth
- 🧭 Interactively browse teams, spaces, folders, lists, and tasks
- 📋 View all tasks in a list, sorted and color-coded by status
- 🛠️ Update task properties like status and dates


## 🚀 Installation
1. Install clickctl globally using npm:
   ```bash
   npm install -g clickctl
   ```


## 🔐 Authentication
Before using `clickctl`, you'll need to authenticate with the ClickUp API:
1. Log in to ClickUp.
2. In the upper-right corner, click your avatar.
3. Select Settings.
4. In the sidebar, click Apps.
5. Click Create new app.
6. Name the app (you can call it clickctl 🙈) and add `http://localhost:3000/callback` as the redirect URL.
7. Copy your Client ID and Client Secret.
8. Run the authentication command:
   ```bash
   clickctl auth --client-id <your-client-id> --secret <your-client-secret>
   ```
   This will open a browser window for you to authorize the app and stores your credentials securely.


9. Next time you can simply run:
    ```bash
    clickctl auth
    ```
    It will reuse your saved credentials


## 🧠 Usage
1. Run any command using:
    ```bash
    clickctl <command> [options]
    ```
2. Use the `--help` flag to see available commands and options:
    ```bash
    clickctl --help
    ```
   
## 🧪 MVP Highlights
1. The core of clickctl is the browse command:
   ```bash
   clickctl browse
   ```
You’ll be guided through your ClickUp hierarchy — team → space → folder → list — and then shown your tasks in a clean, sortable, color-coded view.

## 🫡 Commands
| Command |                   Description                   |
|:-------:|:-----------------------------------------------:|
|  auth   |       Authenticate with ClickUp via OAuth       |
| browse  | Interactively browse and manage tasks in a list |
|  teams  |      View your ClickUp teams (workspaces)       |
| spaces  |         View spaces in a specific team          |
| folders |        View folders in a specific space         |
|  lists  |         View lists in a specific folder         | 

## 📌 Version
- v1.0.0: Initial release with basic functionality for listing folders, lists, and tasks, and updating task properties.
- v1.1.0: Added interactive browsing of tasks, improved UX with color-coded statuses, and enhanced task property updates.


## 📬 Contributions
This is an open MVP. PRs, issues, and feature suggestions are welcome! If you have ideas for enhancements (like creating tasks, archiving, etc.), feel free to open an issue or PR.


## 🛠 Built With
* Node.js 
* Commander 
* Chalk
* Inquirer


