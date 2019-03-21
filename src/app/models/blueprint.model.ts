import { CSS } from "./css.model";


type scripttypes = CSS;

export interface Blueprint {

    name: string;
    descr: string;
    scripts: scripttypes[];

}