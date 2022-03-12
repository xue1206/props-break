declare type Options = {
    componentName: string;
    propsTypeName: string;
    propsFields: string[];
    children?: boolean;
};
export declare const generate: (options: Options) => string;
export default generate;
