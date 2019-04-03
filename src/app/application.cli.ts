import chalk from 'chalk';

const { prompt } = require('enquirer');

import { Application } from './application';
//import { Architect} from './Architect';
//import { Installer } from "./installer/installer";


export class ApplicationCli extends Application {

    fileSelect = {
        type: 'select',
        name: 'blueprint',
        message: '',
        initial: 1,
        choices: []
    };
    fileConfirm = {
        type: 'confirm',
        name: 'confirm',
        message: ''
    };

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
                if (list === null) throw new Error('There are no blueprints in templates folder');
                let question = list.length === 1 ? this.fileConfirm : this.fileSelect;
                question.message = list.length === 1 ? list[0] + ' is the only file. Do you still want to delete it?'
                    : 'Which blueprint do you want to delete?';
                // @ts-ignore
                question.choices = list.length !== 1 ? list: null;

                this.promptout([question])
                    .then((answer: any) => {
                        if (answer.confirm) this.deleteBlueprint(list[0]);
                        if (answer.blueprint) this.deleteBlueprint(answer.blueprint);
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
            .then((list: any) => {
                if (list === null) throw new Error('There are no blueprints in templates folder');
                let question = list.length === 1 ? this.fileConfirm : this.fileSelect;
                question.message = list.length === 1 ? list[0] + ' is the only file. Do you want to view it?'
                    : 'Which blueprint do you want to view in detail?';
                // @ts-ignore
                question.choices = list.length !== 1 ? list: null;

                this.promptout([question]).then((answer: any) => {
                    if (answer.confirm) this.getBlueprint(list[0]).then(console.log);
                    if (answer.blueprint) this.getBlueprint(answer.blueprint).then(console.log);
                });
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
        return prompt(questions);
    }

}