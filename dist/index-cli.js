#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const chalk_1 = __importDefault(require("chalk"));
const application_cli_1 = require("./app/application.cli");
const appcli = new application_cli_1.ApplicationCli();
const pkg = require('../package.json');
class CLI {
    constructor() {
        console.log(chalk_1.default.cyan(`fitter started.`));
    }
    initCLI() {
        commander_1.default.version(pkg.version);
        this.initList();
        this.initInstall();
        this.initArchitect();
        this.initcustomHelp();
        commander_1.default.parse(process.argv);
    }
    initList() {
        commander_1.default.command('list')
            .option('-g, --group', 'List all groups')
            .option('-b, --blueprints', 'List all blueprints')
            .action((options) => {
            if (options.group)
                console.log('listing groups');
            if (options.blueprints)
                appcli.listBlues();
        });
    }
    initArchitect() {
        commander_1.default.command('blueprint')
            .alias('blue')
            .description('The architect makes blueprint')
            .option('-c, --create', 'creates a blueprint.')
            .option('-d, --delete', 'deletes a blueprint')
            .option('-D, --Detail', 'outputs detailed information about the selected blueprint')
            .action((options) => {
            console.log(process.cwd());
            if (options.create)
                appcli.drawBlue(process.cwd());
            if (options.delete)
                appcli.dropBlue();
            if (options.Detail) {
                appcli.infoList();
            }
        });
    }
    initInstall() {
        commander_1.default.command('install [srcpath] [options]')
            .alias('inst')
            .description('run setup commands for all envs')
            .option('')
            .action((srcpath, options) => {
            console.log(srcpath);
            console.log(options);
            console.log(process);
        });
    }
    initcustomHelp() {
        commander_1.default.on('--help', function () {
        });
    }
}
const cli = new CLI();
cli.initCLI();
