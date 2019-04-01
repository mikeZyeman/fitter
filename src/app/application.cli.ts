import inquirer from 'inquirer';
import chalk from 'chalk';



import { Application } from './application';
import { Architect } from './architect/architect';
//import { Installer } from "./installer/installer";

const arch = new Architect();

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
        this.getString.name = 'name';
        this.getString.message = 'How would you call your blueprint?';

        inquirer.prompt([this.getString])
            .then((answer: {}) => {

                arch.scanning(path);
                console.log(answer)
                /*

                var prompt = new Prompt({
                    name: 'colors',
                    message: 'Which files do you want to copy into your Blueprint? Press Spacebar to mark the checkboxes. Press Enter to submit.',
                    choices: {
                        dependencies: [

                        ],
                        devDependencies: ['mocha', 'kind-of']
                    }
                });

                prompt.run()
                    .then((answer: {}) => {
                        console.log(answer);
                    })
                    */
            })

        /*

        inquirer.prompt([this.getString])
            .then((answer: {}) => {

                arch.scanning(path)
                    .then((data) => {
                        console.log(data)
                    })




                /*
                // @ts-ignore
                this.createBlueprint(answer.name)
                    .then(() => {
                        console.log(chalk.greenBright('Blueprint successfully created'));
                    })
                    .catch((err: any) => {
                        console.log(chalk.bgRedBright('Something went wrong while creating'));
                        console.log(err);
                    })
            })

    */
    }

    dropBlue() {
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

                inquirer.prompt([this.getlist])
                    .then((answer: {}) => {
                        // @ts-ignore
                        this.infoBlue(answer.selectBlueprint);
                    })
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


}