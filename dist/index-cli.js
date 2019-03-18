#!/usr/bin/env node
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var pkg = require('../package.json');
var application_1 = require("./app/application");
var CLI = (function (_super) {
    __extends(CLI, _super);
    function CLI() {
        var _this = _super.call(this) || this;
        commander_1.default
            .version(pkg.version)
            .option('-i, --information', 'Gets information from project/srcPath for language, framework, package.json and tags in directory')
            .option('-S, --server', 'Creates a server on localhost (default port: 5200) ' +
            'which displays the documentation')
            .option('-C, --configuration [configuration]', 'Fetches the current configuration')
            .option('--port [port]', 'sets port for hosted server');
        _this.setInstall();
        _this.setSave();
        commander_1.default.parse(process.argv);
        return _this;
    }
    CLI.prototype.setInstall = function () {
        commander_1.default.command('install [srcpath]')
            .alias('ins')
            .description('run setup commands for all envs')
            .option('')
            .action(function (env) {
            console.log(env);
        });
    };
    CLI.prototype.setSave = function () {
        commander_1.default.command('save [srcpath]')
            .option('')
            .action(function (args) {
            console.log(args);
        });
    };
    return CLI;
}(application_1.Application));
var cli = new CLI();
