"use strict";
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var annotations_1 = require("./annotations");
require("urijs");
function bootstrap(appComponentType) {
    console.log("Registered components: " + annotations_1.components.length);
    var promises = [];
    var _loop_1 = function(metadata) {
        var promiseTemplate = Promise.resolve(true);
        if (!metadata.template && !metadata.templateUrl) {
            templateUrl = new URI(metadata.moduleId).suffix("html");
            console.log("  Loading template: " + templateUrl);
            promiseTemplate = System.import(templateUrl + "!text").then(function (template) {
                metadata.template = template;
                console.log("  Template loaded: " + template);
            });
        }
        var promiseStyles = Promise.resolve(true);
        if (!metadata.styles && !metadata.styleUrls) {
            stylesUrl = new URI(metadata.moduleId).suffix("css");
            console.log("  Loading styles: " + stylesUrl);
            promiseStyles = System.import(stylesUrl + "!text").then(function (styles) {
                metadata.styles = [styles];
                console.log("  Styles loaded: " + styles);
            });
        }
        promises.push(Promise.all([promiseTemplate, promiseStyles]).then(function () {
            if (metadata.encapsulation === undefined) {
                metadata.encapsulation = core_1.ViewEncapsulation.None;
            }
            core_1.Component(metadata)(metadata.target);
        }));
    };
    var templateUrl, stylesUrl;
    for (var _i = 0, components_1 = annotations_1.components; _i < components_1.length; _i++) {
        var metadata = components_1[_i];
        _loop_1(metadata);
    }
    return Promise.all(promises).then(function () {
        return platform_browser_dynamic_1.bootstrap(appComponentType);
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map