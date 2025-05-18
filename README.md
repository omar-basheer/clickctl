# clickctl

A simple CLI tool for interacting with [ClickUp](https://clickup.com) tasks via the ClickUp API.

## ✨ Features
- View teams (workspaces) and spaces in your ClickUp account
- View folders in a ClickUp space
- View lists within a folder
- View tasks in a list
- Update task properties (status, priority, dates, name)


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


## 🫡 Commands
|     Command    |                     Description                    |
|:--------------:|:--------------------------------------------------:|
|   auth         |   Authenticate with ClickUp via OAuth              |
|   teams        |   View your ClickUp teams (workspaces)             |
|   spaces       |   View spaces in a specific team                   |
|   folders      |   View folders in a specific space                 |
|   lists        |   View lists in a specific folder                  |
|   tasks        |   View tasks in a specific list                    |
|   update:task  |   Update a task’s properties (status, name, etc.)  |

## 📌 Version
- v1.0.0: Initial release with basic functionality for listing folders, lists, and tasks, and updating task properties.


## 📬 Contributions

Pull requests welcome! If you have ideas for enhancements (like creating tasks, archiving, etc.), feel free to open an issue or PR.


## 🛠 Built With
* Node.js 
* Commander 
* Chalk


