#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
let pkg = require('../package.json');
const application_cli_1 = require("./app/application.cli");
const chalk_1 = __importDefault(require("chalk"));
const appcli = new application_cli_1.ApplicationCli();
class CLI {
    constructor() {
        console.log(chalk_1.default.cyan(`fitter started.`));
    }
    initCLI() {
        commander_1.default
            .version(pkg.version)
            .option('-i, --information', 'Gets information from project/srcPath for language, framework, package.json and tags in directory')
            .option('-S, --server', 'Creates a server on localhost (default port: 5200) ' +
            'which displays the documentation')
            .option('-C, --configuration [configuration]', 'Fetches the current configuration')
            .option('--port [port]', 'sets port for hosted server');
        this.initInstall();
        this.initArchitect();
        commander_1.default.parse(process.argv);
    }
    initInstall() {
        commander_1.default.command('fitter [srcpath]')
            .alias('inst')
            .description('run setup commands for all envs')
            .option('')
            .action((env, options) => {
            switch (options) {
            }
            console.log(env);
        });
    }
    initArchitect() {
        commander_1.default.command('blueprint')
            .alias('blue')
            .description('The architect makes architect')
            .option('-c, --create', 'creates a architect.')
            .option('-d, --delete', 'deletes a architect')
            .option('-l, --list', 'outputs a list of schemes')
            .option('-D, --Detail', 'outputs detailed information about the selected architect')
            .action((options) => {
            if (options.create)
                console.log('Create');
            if (options.delete)
                console.log('Delete');
            if (options.list)
                appcli.listBlueprints();
            if (options.Detail)
                appcli.infoBlueprint();
        });
    }
}
const cli = new CLI();
cli.initCLI();
