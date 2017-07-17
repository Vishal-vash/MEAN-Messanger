import { EventEmitter } from "@angular/core";

import { AppError } from "./error.modal";

export class ErrorService {

    emitError = new EventEmitter<AppError>()

    handleError(error){
        const errorData = new AppError(error.title, error.error.message);
        this.emitError.emit(errorData);
    }
}