"use strict";
exports.components = [];
function Component(metadata) {
    exports.components.push(metadata);
    metadata.moduleId = SystemJSExtensions.getExecutingModule().name;
    return function (target) {
        metadata.target = target;
    };
}
exports.Component = Component;
//# sourceMappingURL=annotations.js.map