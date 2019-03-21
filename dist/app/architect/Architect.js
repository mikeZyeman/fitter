"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
class Architect {
    async drawBlueprint(name, json = { name: 'hi' }) {
        await fs_extra_1.default.writeJSON(`./templates/${name}.Blueprint.json`, json);
    }
    buildJSON() {
        this.scanning('./');
    }
    markFiles() {
    }
    async editBlueprint() {
    }
    async deleteBlueprint(file) {
        await fs_extra_1.default.unlink(`./templates/${file}`);
    }
    async getBlueprints() {
        return await fs_extra_1.default.readdir('./templates');
    }
    async getBlueprint(file) {
        return await fs_extra_1.default.readJSON(`./templates/${file}`);
    }
    scanning(path) {
        fs_extra_1.default.readJSON(`${path}`)
            .then((files) => {
            console.log(files);
        });
    }
}
exports.Architect = Architect;
