(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define([
            "exports",
            "typescript"
        ], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("typescript"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.typescript);
        global.index = mod.exports;
    }
})(this, function(_exports, ts) {
    "use strict";
    ts = _interopRequireWildcard(ts);
    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = _exports.parse = void 0;
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for(var key in obj){
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                        if (desc.get || desc.set) {
                            Object.defineProperty(newObj, key, desc);
                        } else {
                            newObj[key] = obj[key];
                        }
                    }
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    var DEFINITION_TYPES = [
        ts.SyntaxKind.TypeAliasDeclaration,
        ts.SyntaxKind.InterfaceDeclaration
    ];
    var createSource = function(code) {
        return ts.createSourceFile("_.ts", code, ts.ScriptTarget.Latest);
    };
    var walk = function(node) {
        try {
            if (DEFINITION_TYPES.includes(node.kind)) {
                return node;
            } else if (node.getChildCount() > 0) {
                return walk(node.getChildAt(0));
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    };
    var parseNode = function(node) {
        var name = node.name.escapedText;
        var fields = [];
        if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
            node.type.forEachChild(function(child) {
                fields.push(child.name.escapedText);
            });
        } else {
            node.members.forEach(function(child) {
                fields.push(child.name.escapedText);
            });
        }
        return {
            name: name,
            fields: fields
        };
    };
    var parse = function(code) {
        var source = createSource(code);
        var target = walk(source);
        if (!target) {
            return null;
        }
        return parseNode(target);
    };
    _exports.parse = parse;
    var _default = parse;
    _exports.default = _default;
});


//# sourceMappingURL=index.js.map