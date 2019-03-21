"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
class Architect {
    async drawBlueprint(name, json = { name: 'hi' }) {
        try {
            await fs_extra_1.default.writeJSON(`./templates/${name}.json`, json);
            console.log(chalk_1.default.greenBright('Successfully created a json file'));
        }
        catch (err) {
            console.error(err);
        }
    }
    buildJSON() {
    }
    editBlueprint() {
    }
    deleteBlueprint(file) {
        fs_extra_1.default.unlink(`./templates/${file}`, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log(chalk_1.default.greenBright(`File ${file} successfully deleted`));
            }
        });
    }
    async getBlueprints() {
        try {
            return await fs_extra_1.default.readdir('./templates');
        }
        catch (err) {
            console.error(err);
        }
    }
    async getBlueprint(file) {
        return await fs_extra_1.default.readJSON(`./templates/${file}`);
    }
}
exports.Architect = Architect;
