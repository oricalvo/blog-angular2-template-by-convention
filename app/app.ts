import {ApplicationRef} from '@angular/core';
import {Component} from "../fx/annotations";
import {ClockComponent} from "./clock";

@Component({
    selector: 'my-app',
    directives: [ClockComponent]
})
export class AppComponent {
    constructor() {
    }
}
