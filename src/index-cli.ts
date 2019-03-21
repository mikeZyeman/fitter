#!/usr/bin/env node

import program from 'commander';
let pkg = require('../package.json');

import { ApplicationCli } from "./app/application.cli";
import chalk from "chalk";

const appcli = new ApplicationCli();

class CLI {

    constructor() {
        console.log(chalk.cyan(`fitter started.`))
    }

    initCLI() {
        program
            .version(pkg.version)
            //Information
            .option('-i, --information',
                'Gets information from project/srcPath for language, framework, package.json and tags in directory')
            //Hosting
            .option('-S, --server',
                'Creates a server on localhost (default port: 5200) ' +
                'which displays the documentation')
            //Configuration
            .option('-C, --configuration [configuration]',
                'Fetches the current configuration')
            //Options
            .option('--port [port]', 'sets port for hosted server');

        this.initInstall();
        this.initArchitect();

        program.parse(process.argv);


    }

    private initInstall() {
        program.command('fitter [srcpath]')
            .alias('inst')
            .description('run setup commands for all envs')
            .option('')
            .action((env, options) => {

                switch(options) {

                }

                console.log(env);
            })
    }

    private initArchitect() {
        program.command('blueprint')
            .alias('blue')
            .description('The architect makes architect')
            .option('-c, --create', 'creates a architect.')
            .option('-d, --delete', 'deletes a architect')
            .option('-l, --list', 'outputs a list of schemes')
            .option('-D, --Detail', 'outputs detailed information about the selected architect')
            .action((options) => {

                if (options.create) console.log('Create');
                if (options.delete) console.log('Delete');
                if (options.list) appcli.listBlueprints();
                if (options.Detail) appcli.infoBlueprint();
            })
    }
}

const cli: CLI = new CLI();
cli.initCLI();
