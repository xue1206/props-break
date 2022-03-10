declare module "index" {
    import * as ts from "typescript";
    export const parse: (code: string) => {
        name: ts.__String;
        fields: string[];
    };
    export default parse;
}
