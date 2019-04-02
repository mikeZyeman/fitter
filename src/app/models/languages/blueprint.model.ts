import { CSS } from "./css.model";
import { HTML } from "./html.model";
import { Javascript } from "./javascript.model";
import { Typescript } from "./typescript.model";

type scripttypes = CSS | HTML | Javascript | Typescript;
type directories = scripttypes[];

export interface Blueprint {

    name: string;
    descr: string;
    originPath: string;
    scripts: scripttypes[];

}