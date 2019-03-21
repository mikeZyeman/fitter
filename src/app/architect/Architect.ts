import fs from 'fs-extra';

//import { Blueprint } from "../models/blueprint.model";

export class Architect {



    public async drawBlueprint(name: string, json: Object = {name: 'hi'}) {
        await fs.writeJSON(`./templates/${name}.Blueprint.json`, json);
    }

    public buildJSON() {
        this.scanning('./');
    }

    public markFiles() {

    }

    public async editBlueprint() {

    }

    public async deleteBlueprint(file: string) {
        await fs.unlink(`./templates/${file}`)
    }

    public async getBlueprints() {
        return await fs.readdir('./templates');
    }

    public async getBlueprint(file: string) {
        return await fs.readJSON(`./templates/${file}`);
    }

    private scanning(path: string) {
        fs.readJSON(`${path}`)
            .then((files) => {
                console.log(files);
            })
    }


}