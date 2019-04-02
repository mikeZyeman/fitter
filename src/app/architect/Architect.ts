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

        const tree = dirTree(path);

        let name: string = tree.name;
        let files: string[] = [];
        let directories: any[] = [];

        const recursiveFunc = (Child: any, path: string = "") => {

            let type: string = Child.type;
            let name: string = Child.name;
            let files: string[] = [];
            let directories: any[] = [];

            if (Child.type === 'directory') {
                Child.children.forEach((child: any) => {
                    let content = recursiveFunc(child, path + Child.name + '/');
                    if (content.type === 'file') {
                        files = [...files, content.name]
                    }
                    if (content.type === 'directory') {
                        directories = [...directories, {
                            name: content.name,
                            files: content.files,
                            directories: content.directories
                        }]
                    }
                });
            }

            return {
                type: type,
                name: name,
                files: files,
                directories: directories
            };

        };

        tree.children.forEach((child: any) => {
            let content = recursiveFunc(child);

            if (content.type === 'file') {
                files = [...files, content.name]
            }
            if (content.type === 'directory') {
                directories = [...directories, {
                    name: content.name,
                    files: content.files,
                    directories: content.directories
                }]
            }
        });

        return {
            path: path,
            name: name,
            files: files,
            directories: directories
        };
    }

    public markFiles() {

    }

    public async editBlueprint() {

    }

    public async deleteBlueprint(file: string) {
        await fs.unlink(`./templates/${file}`)
    }

    public async getBlueprints() {
        return this.getDir('./templates');
    }

    public async getBlueprint(file: string) {
        return fs.readJSON(`./templates/${file}`);
    }

    private async getDir(path: string) {
        return fs.readdir(path);
    }

}