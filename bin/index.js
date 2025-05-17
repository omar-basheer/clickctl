#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const lists = require("../src/commands/list");
const tasks = require("../src/commands/task");
const folders = require("../src/commands/folder");

const program = new Command();

program
    .name("clickctl")
    .description("CLI tool for interacting with ClickUp tasks")
    .version("1.0.0");

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