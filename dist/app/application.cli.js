"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
inquirer_1.default.registerPrompt('directory', require('inquirer-select-directory'));
const application_1 = require("./application");
class ApplicationCli extends application_1.Application {
    constructor() {
        super();
        this.message = "";
        this.confirmation = {
            type: "confirm",
            name: "confirmation",
            default: false
        };
        this.chooseFile = {
            type: "directory",
            name: "chooseFile",
            basePath: "./templates",
            options: {
                displayFiles: true
            }
        };
        this.chooseBlueprint = {
            type: "list",
            name: "chooseBlueprint",
        };
    }
    createBlueprint() {
    }
    deleteBlueprint() {
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
            console.error(err);
        });
    }
    infoBlueprint() {
        this.getBlueprints()
            .then((list) => {
            if (list === null) {
                console.log(chalk_1.default.redBright('There are no Blueprints'));
                return;
            }
            this.chooseBlueprint.message = "Which architect do you want to use?";
            this.chooseBlueprint.choices = list;
            inquirer_1.default.prompt([this.chooseBlueprint])
                .then((answer) => {
                this.getBlueprint(answer.chooseBlueprint)
                    .then((data) => {
                    console.log(data);
                });
            });
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.ApplicationCli = ApplicationCli;
