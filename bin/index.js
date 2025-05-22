#!/usr/bin/env node

const {Command} = require("commander");
const chalk = require("chalk");
const auth = require("../src/commands/auth");
const teams = require("../src/commands/teams");
const spaces = require("../src/commands/spaces");
const folders = require("../src/commands/folder");
const lists = require("../src/commands/list");
const tasks = require("../src/commands/task");

const program = new Command();

// Default command
program
    .name("clickctl")
    .description("A CLI tool for interacting with ClickUp tasks 🤩\n\nUse this tool to authenticate, browse teams/spaces/folders/lists, and manage tasks directly from your terminal.\n\nStart with `clickctl auth` to link your account.")
    .version("1.0.0");


// Authentication command
program
    .command("auth")
    .description(`Authenticate with ClickUp via OAuth.
    
        Options:
          -c, --client-id       Your ClickUp app's client ID
          -s, --client-secret   Your ClickUp app's client secret
        
        Example:
          clickctl auth -c your-client-id -s your-client-secret
          
          `
    )
    .option("-c, --client-id <id>", "ClickUp client ID")
    .option("-s, --client-secret <secret>", "ClickUp client secret")
    .action(auth.authenticate)


// Teams command
program
    .command("teams")
    .description(`See teams in your ClickUp workspace
    
        Example:
            clickctl teams
            
    `)
    .option("-w, --workspace-id <id>", "ClickUp workspace ID")
    .action(teams.getTeams)


// Spaces command
program
    .command("spaces")
    .description(`See spaces within a specific team.

        You need a team ID, which you can get by running:
          clickctl teams
        
        Example:
          clickctl spaces -t <team-id>
          
    `)
    .option("-t, --team-id <id>", "ClickUp team ID")
    .action(spaces.getSpaces);


// Folders command
program
    .command("folders")
    .description(`See folders within a specific space.

        You need a space ID, which you can get by running:
          clickctl spaces -t <team-id>
        
        Example:
          clickctl folders -s <space-id>
          
    `)
    .option("-s, --space-id <id>", "ClickUp space ID")
    .action(folders.getFolders);


// Lists command
program
    .command("lists")
    .description(`See lists within a specific folder.

        You need a folder ID, which you can get by running:
          clickctl folders -s <space-id>
        
        Example:
          clickctl lists -f <folder-id>
          
    `)
    .option("-f, --folder-id <id>", "ClickUp folder ID")
    .action(lists.getLists);


// Tasks command
program
    .command("tasks")
    .description(`See tasks in a specific list.

        You need a list ID, which you can get by running:
          clickctl lists -f <folder-id>
        
        Example:
          clickctl tasks -l <list-id>
  
    `)
    .requiredOption("-l, --list-id <id>", "ClickUp list ID")
    .action(tasks.getTasks);


// Update task command
program
    .command("update:task")
    .description(`Update properties of a specific task in ClickUp.

        You need the task ID, which you can get by running:
          clickctl tasks -l <list-id>
        
        You can update status, priority, name, and dates.
        
        Examples:
          clickctl update:task -i task123 -s "in progress"
          clickctl update:task -i task123 -p high -n "Refactor login logic"
  
    `)
    .requiredOption("-i, --task-id <id>", "Task ID")
    .option("-s, --status <status>", "New status")
    .option("-p, --priority <priority>", "New priority")
    .option("-d, --start-date <date>", "New start date")
    .option("-e, --due-date <date>", "New due date")
    .option("-n, --name <name>", "New task name")
    .action(tasks.updateTask);

program.parse(process.argv);