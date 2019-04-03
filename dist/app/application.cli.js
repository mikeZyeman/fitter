"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const { prompt } = require('enquirer');
const application_1 = require("./application");
class ApplicationCli extends application_1.Application {
    drawBlue(path) {
        const dirtree = this.scanDir(path);
        const questions = [
            {
                type: 'input',
                name: 'bpname',
                message: 'Step 1: how would you name your blueprint'
            },
            {
                type: 'multiselect',
                name: 'selected-files',
                message: 'Step 2: Mark the files you want to copy.',
                initial: '',
                choices: this.redefJSON(dirtree),
                result(values) {
                    return this.map(values);
                }
            }
        ];
        this.promptout(questions)
            .then((answer) => console.log(answer))
            .catch(console.error);
    }
    dropBlue() {
        this.getBlueprints()
            .then((list) => {
            if (list === null) {
                console.log(chalk_1.default.redBright('There are no Blueprints'));
                return null;
            }
            if (list.length === 1) {
                return null;
            }
            const questions = [
                {
                    type: 'select',
                    name: 'blueprint',
                    message: 'Which blueprint do you want to delete?',
                    initial: 1,
                    choices: list
                }
            ];
            this.promptout(questions)
                .then((answer) => {
                console.log(answer.blueprint);
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
    infoDetail() {
        this.getBlueprints()
            .then((list) => {
            if (list === null) {
                console.log(chalk_1.default.redBright('There are no Blueprints'));
                return null;
            }
            if (list.length === 1) {
                return null;
            }
            const questions = [
                {
                    type: 'select',
                    name: 'blueprint',
                    message: 'Which blueprint do you want to view in detail?',
                    initial: 1,
                    choices: list
                }
            ];
            this.promptout(questions)
                .then((answer) => {
                console.log(answer.blueprint);
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
    async promptout(questions) {
        return await prompt(questions);
    }
}
exports.ApplicationCli = ApplicationCli;
