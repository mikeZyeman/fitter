#!/usr/bin/env node

import program from 'commander';
let pkg = require('../package.json');

import { Application } from "./app/application";

class CLI extends Application {

    constructor() {

        super();
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

        this.setInstall();

        this.setSave();

        program.parse(process.argv);


    }

    setInstall() {
        program.command('install [srcpath]')
            .alias('ins')
            .description('run setup commands for all envs')
            .option('')
            .action((env) => {
                console.log(env);
            })
    }

    setSave() {
        program.command('save [srcpath]')
            .option('')
            .action((args) => {
                console.log(args);
            })
    }
}

const cli: CLI = new CLI();
