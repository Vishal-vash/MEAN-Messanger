import { Component, OnInit } from "@angular/core";

import { AppError } from "./error.modal";
import { ErrorService } from "./error.service";

@Component({
    selector : 'app-error',
    templateUrl : './error.component.html',
    styles : [`
        .backdrop{
            background : rgba(0,0,0,0.2);
            width : 100%;
            height : 100vh;
            z-index:10;
            position:fixed;
            top: 0;
            left : 0;
        }
    `]
})

export class ErrorComponent implements OnInit {
    error : AppError;
    display : string = 'none';

    constructor(private errorService : ErrorService) {}

    onErrorHandled(){
        this.display = 'none'
    }

    ngOnInit(){
        this.errorService.emitError
                         .subscribe(error => {
                            this.error = error,
                            this.display = 'block'
                         })
    }
}