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
        let files = [];
        let directories = [];
        const recursiveFunc = (Child, path = "") => {
            let type = Child.type;
            let name = Child.name;
            let files = [];
            let directories = [];
            if (Child.type === 'directory') {
                Child.children.forEach((child) => {
                    let content = recursiveFunc(child, path + Child.name + '/');
                    if (content.type === 'file') {
                        files = [...files, content.name];
                    }
                    if (content.type === 'directory') {
                        directories = [...directories, {
                                name: content.name,
                                files: content.files,
                                directories: content.directories
                            }];
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
        tree.children.forEach((child) => {
            let content = recursiveFunc(child);
            if (content.type === 'file') {
                files = [...files, content.name];
            }
            if (content.type === 'directory') {
                directories = [...directories, {
                        name: content.name,
                        files: content.files,
                        directories: content.directories
                    }];
            }
        });
        return {
            path: path,
            name: name,
            files: files,
            directories: directories
        };
    }
    markFiles() {
    }
    async editBlueprint() {
    }
    async deleteBlueprint(file) {
        await fs_extra_1.default.unlink(`./templates/${file}`);
    }
    async getBlueprints() {
        return await this.getDir('./templates');
    }
    async getBlueprint(file) {
        return await fs_extra_1.default.readJSON(`./templates/${file}`);
    }
    async getDir(path) {
        return await fs_extra_1.default.readdir(path);
    }
}
exports.Architect = Architect;
