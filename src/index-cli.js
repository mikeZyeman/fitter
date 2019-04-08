#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var chalk_1 = require("chalk");
var application_cli_1 = require("./app/application-cli");
var appcli = new application_cli_1.ApplicationCli();
var pkg = require('../package.json');
var CLI = /** @class */ (function () {
    function CLI() {
        console.log(chalk_1["default"].cyan("fitter started."));
    }
    CLI.prototype.initCLI = function () {
        commander_1["default"].version(pkg.version);
        this.initList();
        this.initInstall();
        this.initArchitect();
        this.initcustomHelp();
        commander_1["default"].parse(process.argv);
    };
    CLI.prototype.initList = function () {
        commander_1["default"].command('list')
            .option('-g, --group', 'List all groups')
            .option('-b, --blueprints', 'List all blueprints')
            .action(function (options) {
            if (options.group)
                console.log('listing groups');
            if (options.blueprints)
                appcli.listBlues();
        });
    };
    CLI.prototype.initArchitect = function () {
        commander_1["default"].command('blueprint')
            .alias('blue')
            .description('The architect makes blueprint')
            .option('-c, --create', 'creates a blueprint.')
            .option('-d, --delete', 'deletes a blueprint')
            .option('-D, --Detail', 'outputs detailed information about the selected blueprint')
            .action(function (options) {
            if (options.create)
                appcli.drawBlue(process.cwd());
            if (options["delete"])
                appcli.dropBlue();
            if (options.Detail) {
                appcli.infoDetail();
            }
        });
    };
    CLI.prototype.initInstall = function () {
        commander_1["default"].command('install [srcpath] [options]')
            .alias('inst')
            .description('run setup commands for all envs')
            .option('')
            .action(function (srcpath, options) {
            console.log(srcpath);
            console.log(options);
            console.log(process);
        });
    };
    CLI.prototype.initcustomHelp = function () {
        commander_1["default"].on('--help', function () {
        });
    };
    return CLI;
}());
exports.CLI = CLI;
var cli = new CLI();
cli.initCLI();
