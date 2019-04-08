"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Architect_1 = require("./components/Architect");
const architect = new Architect_1.Architect();
class Application {
    async createBlueprint(name) {
        architect.drawBlueprint(name);
    }
    async deleteBlueprint(name) {
        architect.deleteBlueprint(name);
    }
    async getBlueprints() {
        return architect.getBlueprints();
    }
    async getBlueprint(file) {
        return architect.getBlueprint(file);
    }
    scanDir(path) {
        return architect.scanning(path);
    }
    redefJSON(json) {
        return architect.redefJSON(json);
    }
}
exports.Application = Application;
