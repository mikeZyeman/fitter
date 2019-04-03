import { Architect } from "./Architect";

/*
import { Implement } from "./installer/implement";
*/


const architect = new Architect();

/*
const install = new Implement();
*/

export class Application {

    public async createBlueprint(name: string) {
        architect.drawBlueprint(name);
    }

    public async deleteBlueprint(name: string) {
        architect.deleteBlueprint(name);
    }

    public async getBlueprints() {
        return architect.getBlueprints();
    }

    public async getBlueprint(file: string) {

        return architect.getBlueprint(file);
    }

    protected scanDir(path: string) {
        return architect.scanning(path);
    }

    protected redefJSON(json: any) {
        return architect.redefJSON(json);
    }
}