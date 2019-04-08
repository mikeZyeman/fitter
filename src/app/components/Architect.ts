import fs from 'fs-extra';
const dirTree = require('directory-tree');

//import { Blueprint } from "../models/blueprint.model";

interface DirTreeJSON {
    path: string,
    name: string,
    directories: any[],
    files: string[]
}

export class Architect {


    public async drawBlueprint(name: string, json: Object = {name: 'hi'}) {
        await fs.writeJSON(`./templates/${name}.Blueprint.json`, json);
    }

    public buildJSON() {

    }

    public scanning(path: string): DirTreeJSON {

        const tree = dirTree(path);

        let name: string = tree.name;
        let directories: any[] = [];
        let files: string[] = [];

        tree.children.forEach((child: any) => {
            let content = this.addSubdir(child);
            [files, directories] = this.addContent(files, directories, content);
        });



        return {
            path: path,
            name: name,
            directories: directories,
            files: files
        };
    }

    private addSubdir(Child: any, path: string = ""): any {
        let type: string = Child.type;
        let name: string = Child.name;
        let directories: any[] = [];
        let files: string[] = [];

        if (Child.type === 'directory') {
            Child.children.forEach((child: any) => {
                let content = this.addSubdir(child, path + Child.name + '/');
                [files, directories] = this.addContent(files, directories, content);
            });
        }

        return { type: type, name: name, files: files, directories: directories };
    }

    private addContent(files: string[] ,directories: any[], content: any) {
        if (content.type === 'file') {
            files = [...files, content.name]
        } else if (content.type === 'directory') {
            directories = [...directories, {
                name: content.name,
                files: content.files,
                directories: content.directories
            }]
        }
        return [files, directories];
    }

    public redefJSON(json: DirTreeJSON, path?: string) {
        let choices: any[] = [];
        path = path === undefined ? '' : path;

        json.directories.forEach((dir: any) => {
            let choice: any = {
                name: dir.name,
                value: path + '/' + dir.name,
                choices: this.redefJSON(dir, path + '/' + dir.name)
            };

            choices = [...choices, choice];
        });
        json.files.forEach((file: string) => {
            choices = [...choices, {
                name: path + '/' + file,
                message: file,
                value: path + '/' + file
            }]
        });

        return choices;
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