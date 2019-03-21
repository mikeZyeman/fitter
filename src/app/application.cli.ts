import inquirer from 'inquirer';
import chalk from 'chalk';

inquirer.registerPrompt('directory', require('inquirer-select-directory'));

import { Application } from './application';

export class ApplicationCli extends Application {

    message: string = "";

    confirmation: any = {
        type: "confirm",
        name: "confirmation",
        default: false
    };
    chooseFile: any = {
        type: "directory",
        name: "chooseFile",
        basePath: "./templates",
        options: {
            displayFiles:true
        }
    };
    chooseBlueprint: any = {
        type: "list",
        name: "chooseBlueprint",
    };

    constructor() {
        super();
    }

    createBlueprint() {

    }

    deleteBlueprint() {

    }

    listBlueprints() {
        this.getBlueprints()
            .then((list) => {
                if (list === null) {
                    console.log(chalk.redBright('There are no Blueprints'));
                    return
                }

                // @ts-ignore
                list.forEach((file) => {
                    console.log(file);
                });
            })
            .catch((err) => {
                console.error(err)
            })

    }

    infoBlueprint() {
        this.getBlueprints()
            .then((list) => {
                if (list === null) {
                    console.log(chalk.redBright('There are no Blueprints'));
                    return;
                }

                this.chooseBlueprint.message = "Which architect do you want to use?";
                this.chooseBlueprint.choices = list;

                inquirer.prompt([this.chooseBlueprint])
                    .then((answer: {}) => {
                        // @ts-ignore
                        this.getBlueprint(answer.chooseBlueprint)
                            .then((data) => {
                                console.log(data);
                            });
                    })
            })
            .catch((err) => {
                console.error(err)
            })
    }
}