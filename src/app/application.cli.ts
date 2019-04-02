import chalk from 'chalk';
import prompts from 'prompts';

import { Application } from './application';
import { Architect} from './architect/architect';
//import { Installer } from "./installer/installer";

const Prompt = require('prompt-checkbox');

const arch = new Architect();


export class ApplicationCli extends Application {

    message: string = "";

    confirmation: any = {
        type: "confirm",
        name: "confirmation",
        default: false
    };
    getFile: any = {
        type: "directory",
        name: "getFile",
        basePath: "./templates",
        options: {
            displayFiles:true
        }
    };
    getlist: any = {
        type: "list",
        name: "selectBlueprint",
    };
    getString: any = {
        type: "input",
    };

    drawBlue(path: string) {

        //console.log(arch.scanning(path));


        let questions = [
            {
                type: 'text',
                name: 'dish',
                message: 'Do you like pizza?'
            },
            {
                type: (prev: any) => prev == 'pizza' ? 'text': null,
                name: 'topping',
                message: 'Name a topping'
            }
        ];

        this.setQuestions(questions)
            .then((data: any) => {
                console.log(data);
            })
    }

    dropBlue() {
        this.getBlueprints()
            .then( (list) => {
                if (list === null) {
                    console.log(chalk.redBright('There are no Blueprints'));
                    return;
                }

                this.getlist.message = "Which blueprint do you want to delete?";
                this.getlist.choices = list;



                /*

                replace inquirerjs with prompt

                inquirer.prompt([this.getlist])
                    .then((answer: {}) => {
                        // @ts-ignore
                        this.deleteBlueprint(answer.selectBlueprint)
                            .then(() => {
                                console.log(chalk.greenBright('Successfully deleted'));
                            })
                            .catch((err: any) => {
                                console.log(chalk.bgRedBright('Something went wrong while deleting'));
                                console.error(err);
                            })
                    })
                    */

            })
            .catch((err) => {
                console.error(err)
            })
    }

    listBlues() {
        this.getBlueprints()
            .then((list) => {
                if (list === null) {
                    console.log(chalk.redBright('There are no Blueprints'));
                    return;
                }
                // @ts-ignore
                list.forEach((file) => {
                    console.log(file);
                });
            })
            .catch((err) => {
                console.log(chalk.bgRedBright('Something went wrong while listing up blueprints'));
                console.error(err)
            })

    }

    infoList() {
        this.getBlueprints()
            .then((list) => {
                console.log(typeof list);

                if (list === null) {
                    console.log(chalk.redBright('There are no Blueprints'));
                    return;
                }

                if (list.length === 1) {

                    return;
                }

                this.getlist.message = "Which blueprint do you want to know in detail?";
                this.getlist.choices = list;

                /*

                replace inquirerjs with prompt

                inquirer.prompt([this.getlist])
                    .then((answer: {}) => {
                        // @ts-ignore
                        this.infoBlue(answer.selectBlueprint);
                    })

                    */
            })
            .catch((err) => {
                console.log(chalk.bgRedBright('Something went wrong while listing up blueprints'));
                console.error(err)
            })
    }

    infoBlue(name: string) {
        this.getBlueprint(name)
            .then((data: any) => {
                console.log(data);
            })
            .catch((err: any) => {
                console.log(chalk.bgRedBright('Something went wrong while getting information from selected blueprint'));
                console.error(err)
            });
    }

    async setQuestions(questions: any[]) {
        return prompts(questions);
    }
}