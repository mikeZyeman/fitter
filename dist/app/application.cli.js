"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const { prompt } = require('enquirer');
const application_1 = require("./application");
class ApplicationCli extends application_1.Application {
    constructor() {
        super(...arguments);
        this.fileSelect = {
            type: 'select',
            name: 'blueprint',
            message: '',
            initial: 1,
            choices: []
        };
        this.fileConfirm = {
            type: 'confirm',
            name: 'confirm',
            message: ''
        };
    }
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
            if (list === null)
                throw 'There are no blueprints in templates folder';
            let question = list.length === 1 ? this.fileConfirm : this.fileSelect;
            question.message = list.length === 1 ? list[0] + ' is the only file. Do you still want to delete it?'
                : 'Which blueprint do you want to delete?';
            question.choices = list.length !== 1 ? list : null;
            this.promptout([question])
                .then((answer) => {
                if (answer.confirm)
                    this.deleteBlueprint(list[0]);
                if (answer.blueprint)
                    this.deleteBlueprint(answer.blueprint);
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
            if (list === null)
                throw 'There are no blueprints in templates folder';
            let question = list.length === 1 ? this.fileConfirm : this.fileSelect;
            question.message = list.length === 1 ? list[0] + ' is the only file. Do you want to view it?'
                : 'Which blueprint do you want to view in detail?';
            question.choices = list.length !== 1 ? list : null;
            this.promptout([question]).then((answer) => {
                if (answer.confirm)
                    this.getBlueprint(list[0]).then(console.log);
                if (answer.blueprint)
                    this.getBlueprint(answer.blueprint).then(console.log);
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
