#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const emoji = require("node-emoji");

program.option("-h, --help", "Help command for all options");
program.parse(process.argv);

if (program.help) console.log(`help is on the way ${emoji.get("coffee")}`);
