import chalk from 'chalk';

const { prompt } = require('enquirer');

import { Application } from './application';
//import { Architect} from './Architect';
//import { Installer } from "./installer/installer";


export class ApplicationCli extends Application {

    drawBlue(path: string) {
        const dirtree = this.scanDir(path);

        const questions: any[] = [
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
                result(values: any) {
                    return this.map(values);
                }
            }
        ];

        this.promptout(questions)
            .then((answer: any) => console.log(answer))
            .catch(console.error);
    }

    dropBlue() {
        this.getBlueprints()
            .then( (list) => {
                if (list === null) {
                    console.log(chalk.redBright('There are no Blueprints'));
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
                    .then((answer: any) => {
                        console.log(answer.blueprint);
                    })

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

    infoDetail() {
        this.getBlueprints()
            .then((list) => {
                if (list === null) {
                    console.log(chalk.redBright('There are no Blueprints'));
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
                    .then((answer: any) => {
                        console.log(answer.blueprint);
                    })

                /*

                replace inquirerjs with enquirer

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

    async promptout(questions: any[]) {
        return await prompt(questions);
    }

}