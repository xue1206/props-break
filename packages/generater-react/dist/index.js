(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define([
            "exports"
        ], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function(_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = _exports.generate = void 0;
    var generate = function(options) {
        return "const ".concat(options.componentName, ": React.FC<").concat(options.propsTypeName, "> = ({ ").concat(options.propsFields.join(", ")).concat(options.children ? ", children" : "", " }) => {\n    return\n}\n");
    };
    _exports.generate = generate;
    var _default = generate;
    _exports.default = _default;
});


//# sourceMappingURL=index.js.map