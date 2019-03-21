import { Architect } from "./architect/Architect";
/*
import { Implement } from "./fitter/implement";
*/

const architect = new Architect();
/*
const install = new Implement();
*/
export class Application {

    makeSave(name: string) {
        architect.drawBlueprint(name);
    }

    mark() {

    }

    async getBlueprints() {
        return await architect.getBlueprints();
    }

    async getBlueprint(file: string) {
        return await architect.getBlueprint(file);
    }

}