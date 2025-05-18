#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const auth = require("../src/commands/auth");
const teams = require("../src/commands/teams");
const spaces = require("../src/commands/spaces");
const folders = require("../src/commands/folder");
const lists = require("../src/commands/list");
const tasks = require("../src/commands/task");

const program = new Command();

program
    .name("clickctl")
    .description("A CLI tool for interacting with ClickUp tasks 🤩")
    .version("1.0.0");

program
    .command("auth")
    .description("Authenticate with ClickUp via OAuth")
    .option("-c, --client-id <id>", "ClickUp client ID")
    .option("-s, --client-secret <secret>", "ClickUp client secret")
    .action(auth.authenticate)

program
    .command("teams")
    .description("See teams in your ClickUp workspace")
    .option("-w, --workspace-id <id>", "ClickUp workspace ID")
    .action(teams.getTeams)

program
    .command("spaces")
    .description("See spaces in a specific team")
    .option("-t, --team-id <id>", "ClickUp team ID")
    .action(spaces.getSpaces);

program
    .command("folders")
    .description("See folders in a specific space")
    .option("-s, --space-id <id>", "ClickUp space ID")
    .action(folders.getFolders);

program
    .command("lists")
    .description("See lists in a specific folder")
    .option("-f, --folder-id <id>", "ClickUp folder ID")
    .action(lists.getLists);

program
    .command("tasks")
    .description("See tasks in a specific list")
    .requiredOption("-l, --list-id <id>", "ClickUp list ID")
    .action(tasks.getTasks);

program
    .command("update:task")
    .description("Update properties of a task")
    .requiredOption("-i, --task-id <id>", "Task ID")
    .option("-s, --status <status>", "New status")
    .option("-p, --priority <priority>", "New priority")
    .option("-d, --start-date <date>", "New start date")
    .option("-e, --due-date <date>", "New due date")
    .option("-n, --name <name>", "New task name")
    .action(tasks.updateTask);

program.parse(process.argv);