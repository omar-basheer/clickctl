#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const list = require("../src/commands/list");
const update = require("../src/commands/update");

const program = new Command();

program
    .name("clickctl")
    .description("CLI tool for interacting with ClickUp tasks")
    .version("1.0.0");

program
    .command("tasks:list")
    .description("List tasks in a specific list or space")
    .option("-l, --list-id <id>", "ClickUp list ID")
    .action(list);

program
    .command("task:update")
    .description("Update a task’s status")
    .requiredOption("-i, --id <id>", "Task ID")
    .requiredOption("-s, --status <status>", "New status")
    .action(update);

program.parse(process.argv);