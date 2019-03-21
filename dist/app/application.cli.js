"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const application_1 = require("./application");
inquirer_1.default.registerPrompt('directory', require('inquirer-select-directory'));
class ApplicationCli extends application_1.Application {
    constructor() {
        super();
        this.message = "";
        this.confirmation = {
            type: "confirm",
            name: "confirmation",
            default: false
        };
        this.getFile = {
            type: "directory",
            name: "chooseFile",
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
    drawBlueprint() {
        this.getString.name = 'name';
        this.getString.message = 'How would you call your blueprint?';
        inquirer_1.default.prompt([this.getString])
            .then((answer) => {
            this.drawBlueprint(answer.name)
                .then(() => {
                console.log(chalk_1.default.greenBright('Bluepring successfully created'));
            })
                .catch((err) => {
                console.log(chalk_1.default.bgRedBright('Something went wrong while creating'));
                console.log(err);
            });
        });
    }
    dropBlueprint() {
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
    listBlueprints() {
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
    infoListBlueprint() {
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
                this.getBlueprint(answer.chooseBlueprint)
                    .then((data) => {
                    console.log(data);
                })
                    .catch((err) => {
                    console.log(chalk_1.default.bgRedBright('Something went wrong while getting information from selected blueprint'));
                    console.error(err);
                });
            });
        })
            .catch((err) => {
            console.log(chalk_1.default.bgRedBright('Something went wrong while listing up blueprints'));
            console.error(err);
        });
    }
    infoBlueprint(name) {
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
