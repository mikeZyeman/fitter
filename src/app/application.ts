import { Architect } from "./architect/Architect";

/*
import { Implement } from "./installer/implement";
*/


const architect = new Architect();

/*
const install = new Implement();
*/

export class Application {

    public async createBlueprint(name: string) {
        await architect.drawBlueprint(name);
    }

    public async deleteBlueprint(name: string) {
        await architect.deleteBlueprint(name);
    }


    public async getBlueprints() {
        return await architect.getBlueprints();
    }

    public async getBlueprint(file: string) {
        return await architect.getBlueprint(file);
    }

}