import {readFileSync} from "fs";

/**
 * Read a schema file of a module.
 * @param moduleName The name of the module.
 * @returns The content of the schema file.
 */
export function readSchema(moduleName: string){
    return readFileSync(`./src/schema/${moduleName}/type.graphql`, 'utf-8')
}