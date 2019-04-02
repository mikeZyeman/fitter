"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("prompts"));
const application_1 = require("./application");
const architect_1 = require("./architect/architect");
const Prompt = require('prompt-checkbox');
const arch = new architect_1.Architect();
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
        let questions = [
            {
                type: 'text',
                name: 'dish',
                message: 'Do you like pizza?'
            },
            {
                type: (prev) => prev == 'pizza' ? 'text' : null,
                name: 'topping',
                message: 'Name a topping'
            }
        ];
        this.setQuestions(questions)
            .then((data) => {
            console.log(data);
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
    async setQuestions(questions) {
        return await prompts_1.default(questions);
    }
}
exports.ApplicationCli = ApplicationCli;
