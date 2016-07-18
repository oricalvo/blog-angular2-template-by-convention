import {ComponentRef, Component, ViewEncapsulation} from "@angular/core";
import {Type} from "@angular/core/src/facade/lang";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {components} from "./annotations";
import "urijs";

declare var URI;
declare var System;

export function bootstrap(appComponentType: Type): Promise<ComponentRef<any>> {
    console.log("Registered components: " + components.length);

    var promises = [];

    for(let metadata of components) {
        let promiseTemplate = Promise.resolve(true);
        if(!metadata.template && !metadata.templateUrl) {
            var templateUrl = new URI(metadata.moduleId).suffix("html");
            console.log("  Loading template: " + templateUrl);
            promiseTemplate = System.import(templateUrl + "!text").then(function (template) {
                metadata.template = template;

                console.log("  Template loaded: " + template);
            });
        }

        let promiseStyles = Promise.resolve(true);
        if(!metadata.styles && !metadata.styleUrls) {
            var stylesUrl = new URI(metadata.moduleId).suffix("css");
            console.log("  Loading styles: " + stylesUrl);
            promiseStyles = System.import(stylesUrl + "!text").then(function (styles) {
                metadata.styles = [styles];

                console.log("  Styles loaded: " + styles);
            });
        }

        promises.push(Promise.all([promiseTemplate, promiseStyles]).then(function() {
            if(metadata.encapsulation === undefined) {
                metadata.encapsulation = ViewEncapsulation.None;
            }

            Component(metadata)((<any>metadata).target);
        }));
    }

    return Promise.all(promises).then(function() {
        return bootstrap(appComponentType);
    });
}

