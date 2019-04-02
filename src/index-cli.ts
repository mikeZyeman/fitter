#!/usr/bin/env node

import program from 'commander';
import chalk from "chalk";

import { ApplicationCli } from "./app/application.cli";

const appcli = new ApplicationCli();
const pkg = require('../package.json');

class CLI {

    constructor() {
        console.log(chalk.cyan(`fitter started.`))
    }

    initCLI() {
        program.version(pkg.version);

        this.initList();
        this.initInstall();
        this.initArchitect();

        this.initcustomHelp();

        program.parse(process.argv);

    }

    private initList() {
        program.command('list')
            .option('-g, --group', 'List all groups')
            .option('-b, --blueprints', 'List all blueprints')
            .action((options) => {
                if (options.group) console.log('listing groups');
                if (options.blueprints) appcli.listBlues();
            })
    }

    private initArchitect() {
        program.command('blueprint')
            .alias('blue')
            .description('The architect makes blueprint')
            .option('-c, --create', 'creates a blueprint.')
            .option('-d, --delete', 'deletes a blueprint')
            .option('-D, --Detail', 'outputs detailed information about the selected blueprint')
            .action((options) => {


                if (options.create) appcli.drawBlue(process.cwd());
                if (options.delete) appcli.dropBlue();
                if (options.Detail) {
                    appcli.infoList()
                }
            })
    }

    private initInstall() {
        program.command('install [srcpath] [options]')
            .alias('inst')
            .description('run setup commands for all envs')
            .option('')
            .action((srcpath, options) => {
                console.log(srcpath);
                console.log(options);
                console.log(process);
            })
    }

    private initcustomHelp() {
        program.on('--help', function() {

        })
    }
}

const cli: CLI = new CLI();
cli.initCLI();
