"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const application_1 = require("./application");
const architect_1 = require("./architect/architect");
const arch = new architect_1.Architect();
inquirer_1.default.registerPrompt('directory', require('inquirer-select-directory'));
class ApplicationCli extends application_1.Application {
    constructor() {
        super(...arguments);
        this.message = "";
        this.confirmation = {
            type: "confirm",
            name: "confirmation",
            default: false
        };
        this.getFile = {
            type: "directory",
            name: "getFile",
            basePath: "./templates",
            options: {
                displayFiles: true
            }
        };
        this.getlist = {
            type: "list",
            name: "selectBlueprint",
        };
        this.getString = {
            type: "input",
        };
    }
    drawBlue(path) {
        this.getString.name = 'name';
        this.getString.message = 'How would you call your blueprint?';
        inquirer_1.default.prompt([this.getString])
            .then((answer) => {
            arch.scanning(path);
            console.log(answer);
        });
    }
    dropBlue() {
        this.getBlueprints()
            .then((list) => {
            if (list === null) {
                console.log(chalk_1.default.redBright('There are no Blueprints'));
                return;
            }
            this.getlist.message = "Which blueprint do you want to delete?";
            this.getlist.choices = list;
            inquirer_1.default.prompt([this.getlist])
                .then((answer) => {
                this.deleteBlueprint(answer.selectBlueprint)
                    .then(() => {
                    console.log(chalk_1.default.greenBright('Successfully deleted'));
                })
                    .catch((err) => {
                    console.log(chalk_1.default.bgRedBright('Something went wrong while deleting'));
                    console.error(err);
                });
            });
        })
            .catch((err) => {
            console.error(err);
        });
    }
    listBlues() {
        this.getBlueprints()
            .then((list) => {
            if (list === null) {
                console.log(chalk_1.default.redBright('There are no Blueprints'));
                return;
            }
            list.forEach((file) => {
                console.log(file);
            });
        })
            .catch((err) => {
            console.log(chalk_1.default.bgRedBright('Something went wrong while listing up blueprints'));
            console.error(err);
        });
    }
    infoList() {
        this.getBlueprints()
            .then((list) => {
            console.log(typeof list);
            if (list === null) {
                console.log(chalk_1.default.redBright('There are no Blueprints'));
                return;
            }
            if (list.length === 1) {
                return;
            }
            this.getlist.message = "Which blueprint do you want to know in detail?";
            this.getlist.choices = list;
            inquirer_1.default.prompt([this.getlist])
                .then((answer) => {
                this.infoBlue(answer.selectBlueprint);
            });
        })
            .catch((err) => {
            console.log(chalk_1.default.bgRedBright('Something went wrong while listing up blueprints'));
            console.error(err);
        });
    }
    infoBlue(name) {
        this.getBlueprint(name)
            .then((data) => {
            console.log(data);
        })
            .catch((err) => {
            console.log(chalk_1.default.bgRedBright('Something went wrong while getting information from selected blueprint'));
            console.error(err);
        });
    }
}
exports.ApplicationCli = ApplicationCli;
