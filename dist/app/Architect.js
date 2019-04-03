"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const dirTree = require('directory-tree');
class Architect {
    async drawBlueprint(name, json = { name: 'hi' }) {
        await fs_extra_1.default.writeJSON(`./templates/${name}.Blueprint.json`, json);
    }
    buildJSON() {
    }
    scanning(path) {
        const tree = dirTree(path);
        let name = tree.name;
        let directories = [];
        let files = [];
        tree.children.forEach((child) => {
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
    addSubdir(Child, path = "") {
        let type = Child.type;
        let name = Child.name;
        let directories = [];
        let files = [];
        if (Child.type === 'directory') {
            Child.children.forEach((child) => {
                let content = this.addSubdir(child, path + Child.name + '/');
                [files, directories] = this.addContent(files, directories, content);
            });
        }
        return { type: type, name: name, files: files, directories: directories };
    }
    addContent(files, directories, content) {
        if (content.type === 'file') {
            files = [...files, content.name];
        }
        else if (content.type === 'directory') {
            directories = [...directories, {
                    name: content.name,
                    files: content.files,
                    directories: content.directories
                }];
        }
        return [files, directories];
    }
    redefJSON(json, path) {
        let choices = [];
        path = path === undefined ? '' : path;
        json.directories.forEach((dir) => {
            let choice = {
                name: dir.name,
                value: path + '/' + dir.name,
                choices: this.redefJSON(dir, path + '/' + dir.name)
            };
            choices = [...choices, choice];
        });
        json.files.forEach((file) => {
            choices = [...choices, {
                    name: path + '/' + file,
                    message: file,
                    value: path + '/' + file
                }];
        });
        return choices;
    }
    async editBlueprint() {
    }
    async deleteBlueprint(file) {
        await fs_extra_1.default.unlink(`./templates/${file}`);
    }
    async getBlueprints() {
        return this.getDir('./templates');
    }
    async getBlueprint(file) {
        return fs_extra_1.default.readJSON(`./templates/${file}`);
    }
    async getDir(path) {
        return fs_extra_1.default.readdir(path);
    }
}
exports.Architect = Architect;
