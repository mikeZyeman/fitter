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
        let dTree = {
            path: '',
            name: '',
            children: []
        };
        const tree = dirTree(path);
        dTree.path = tree.path;
        dTree.name = tree.name;
        tree.children.forEach((child) => {
            if (child.type === 'file') {
                console.log(child.name + ' is a directory');
            }
            if (child.type === 'directory') {
                console.log(child.name + ' is a directory');
            }
        });
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
