# clickctl

A simple CLI tool for interacting with [ClickUp](https://clickup.com) tasks via the ClickUp API.

## ✨ Features

- View folders in a ClickUp space
- View lists within a folder
- View tasks in a list
- Update task properties (status, priority, dates, name)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd clickctl
   ```
   
2. Install the required dependencies:
   ```bash
   npm install
   ```

## 🧠 Usage

1. Run the cli using:
    ```bash
    clickctl [command] [options]
    ```
2. Use the `--help` flag to see available commands and options:
    ```bash
    clickctl --help
    ```
   
   
## 💂🏽 Commands
- `folders`: List folders in a ClickUp space.
- `lists`: List lists within a folder.
- `tasks`: List tasks in a list.
- `update`: Update task properties (status, priority, dates, name).


## 📌 Version
- v1.0.0: Initial release with basic functionality for listing folders, lists, and tasks, and updating task properties.


## 📬 Contributions

Pull requests welcome! If you have ideas for enhancements (like creating tasks, archiving, etc.), feel free to open an issue or PR.


## 🛠 Built With
* Node.js 
* Commander 
* Chalk


