import {
    Component, ComponentMetadata, ComponentMetadataFactory, ChangeDetectionStrategy,
    AnimationEntryMetadata, ViewEncapsulation
} from "@angular/core";
import {Type} from "@angular/core/src/facade/lang";

export var components: ComponentDecoratorCtorParameters[] = [];

declare interface ComponentDecoratorCtorParameters {
    selector?:string;
    inputs?:string[];
    outputs?:string[];
    properties?:string[];
    events?:string[];
    host?:{
        [key:string]:string;
    };
    providers?:any[];
    exportAs?:string;
    moduleId?:string;
    queries?:{
        [key:string]:any;
    };
    viewProviders?:any[];
    changeDetection?:ChangeDetectionStrategy;
    templateUrl?:string;
    template?:string;
    templateNextToComponent?:boolean;
    styleUrls?:string[];
    styles?:string[];
    animations?:AnimationEntryMetadata[];
    directives?:Array<Type | any[]>;
    pipes?:Array<Type | any[]>;
    encapsulation?:ViewEncapsulation;
    interpolation?:[string, string];
    precompile?:Array<Type | any[]>;
}

export function Component(metadata: ComponentDecoratorCtorParameters) {
    components.push(metadata);

    metadata.moduleId = SystemJSExtensions.getExecutingModule().name;

    return function (target: Function) {
        (<any>metadata).target = target;
    }
}

declare var SystemJSExtensions;