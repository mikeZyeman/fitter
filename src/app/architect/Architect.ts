import fs from 'fs-extra';
import chalk from 'chalk';

export class Architect {

    public async drawBlueprint(name: string, json: Object = {name: 'hi'}) {

        try {
            await fs.writeJSON(`./templates/${name}.json`, json);
            console.log(chalk.greenBright('Successfully created a json file'));
        } catch (err) {
            console.error(err);
        }
    }

    public buildJSON() {

    }

    public editBlueprint() {

    }

    public deleteBlueprint(file: string) {
        fs.unlink(`./templates/${file}`, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(chalk.greenBright(`File ${file} successfully deleted`));
            }
        })
    }

    public async getBlueprints() {
        try {
            return await fs.readdir('./templates');
        } catch(err) {
            console.error(err);
        }
    }

    public async getBlueprint(file: string) {
        return await fs.readJSON(`./templates/${file}`)
    }
}