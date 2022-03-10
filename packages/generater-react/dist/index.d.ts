declare module "index" {
    type Options = {
        componentName: string;
        propsTypeName: string;
        propsFields: string[];
        children?: boolean;
    };
    export const generate: (options: Options) => string;
    export default generate;
}
