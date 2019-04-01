import fs from 'fs-extra';
const dirTree = require('directory-tree');

//import { Blueprint } from "../models/blueprint.model";

export class Architect {

    public async drawBlueprint(name: string, json: Object = {name: 'hi'}) {
        await fs.writeJSON(`./templates/${name}.Blueprint.json`, json);
    }

    public buildJSON() {

    }

    public scanning(path: string) {

        let dTree: any = {
            path: '',
            name: '',
            children: []
        };

        const tree = dirTree(path);

        dTree.path = tree.path;
        dTree.name = tree.name;

        tree.children.forEach((child: any) => {
            if (child.type === 'file') {
                console.log(child.name + ' is a directory')
            }
            if (child.type === 'directory') {
                console.log(child.name + ' is a directory')
            }
        })

    }

    public markFiles() {

    }

    public async editBlueprint() {

    }

    public async deleteBlueprint(file: string) {
        await fs.unlink(`./templates/${file}`)
    }

    public async getBlueprints() {
        return await this.getDir('./templates');
    }

    public async getBlueprint(file: string) {
        return await fs.readJSON(`./templates/${file}`);
    }

    private async getDir(path: string) {
        return await fs.readdir(path);
    }

}