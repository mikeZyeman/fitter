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
        program
            .version(pkg.version);

        this.initList();
        this.initInstall();
        this.initArchitect();

        program.parse(process.argv);


    }

    private initList() {
        program.command('list')
            .option('-g, --group', 'List all groups')
            .option('-b, --blueprints', 'List all blueprints')
            .action((options) => {
                if (options.group) console.log('listing groups');
                if (options.blueprints) appcli.listBlueprints();
            })
    }

    private initInstall() {
        program.command('install [srcpath] [options]')
            .alias('inst')
            .description('run setup commands for all envs')
            .option('')
            .action((env, options) => {
                console.log(env);
                console.log(options);
            })
    }

    private initArchitect() {
        program.command('blueprint')
            .alias('blue')
            .description('The architect makes blueprint')
            .option('-c, --create', 'creates a blueprint.')
            .option('-d, --delete', 'deletes a blueprint')
            .option('', '')
            .option('-l, --list', 'outputs a list of blueprints')
            .option('-D, --Detail', 'outputs detailed information about the selected blueprint')
            .action((options) => {

                if (options.create) appcli.drawBlueprint();
                if (options.delete) appcli.dropBlueprint();
                if (options.Detail) {
                    appcli.infoListBlueprint()
                }
            })
    }
}

const cli: CLI = new CLI();
cli.initCLI();
