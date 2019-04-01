"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Architect_1 = require("./architect/Architect");
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
    install() {
    }
}
exports.Application = Application;
