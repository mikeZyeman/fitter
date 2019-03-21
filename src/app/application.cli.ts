import inquirer from 'inquirer';
import chalk from 'chalk';


import { Application } from './application';
//import { Architect } from './architect/architect';
//import { Installer } from "./installer/installer";

inquirer.registerPrompt('directory', require('inquirer-select-directory'));
export class ApplicationCli extends Application {

    message: string = "";

    confirmation: any = {
        type: "confirm",
        name: "confirmation",
        default: false
    };

    getFile: any = {
        type: "directory",
        name: "chooseFile",
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


    constructor() {
        super();
    }

    drawBlueprint() {
        this.getString.name = 'name';
        this.getString.message = 'How would you call your blueprint?';

        inquirer.prompt([this.getString])
            .then((answer: {}) => {
                // @ts-ignore
                this.drawBlueprint(answer.name)
                    .then(() => {
                        console.log(chalk.greenBright('Bluepring successfully created'));
                    })
                    .catch((err: any) => {
                        console.log(chalk.bgRedBright('Something went wrong while creating'));
                        console.log(err);
                    })
            })
    }

    dropBlueprint() {
        this.getBlueprints()
            .then((list) => {
                if (list === null) {
                    console.log(chalk.redBright('There are no Blueprints'));
                    return;
                }

                this.getlist.message = "Which blueprint do you want to delete?";
                this.getlist.choices = list;

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
            })
            .catch((err) => {
                console.error(err)
            })
    }

    listBlueprints() {
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

    infoListBlueprint() {
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

                inquirer.prompt([this.getlist])
                    .then((answer: {}) => {
                        // @ts-ignore
                        this.getBlueprint(answer.chooseBlueprint)
                            .then((data: any) => {
                                console.log(data);
                            })
                            .catch((err: any) => {
                                console.log(chalk.bgRedBright('Something went wrong while getting information from selected blueprint'));
                                console.error(err)
                            });
                    })
            })
            .catch((err) => {
                console.log(chalk.bgRedBright('Something went wrong while listing up blueprints'));
                console.error(err)
            })
    }

    infoBlueprint(name: string) {
        this.getBlueprint(name)
            .then((data: any) => {
                console.log(data);
            })
            .catch((err: any) => {
                console.log(chalk.bgRedBright('Something went wrong while getting information from selected blueprint'));
                console.error(err)
            });
    }
}