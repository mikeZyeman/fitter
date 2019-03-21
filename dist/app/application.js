"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Architect_1 = require("./architect/Architect");
const architect = new Architect_1.Architect();
class Application {
    makeSave(name) {
        architect.drawBlueprint(name);
    }
    mark() {
    }
    async getBlueprints() {
        return await architect.getBlueprints();
    }
    async getBlueprint(file) {
        return await architect.getBlueprint(file);
    }
}
exports.Application = Application;
