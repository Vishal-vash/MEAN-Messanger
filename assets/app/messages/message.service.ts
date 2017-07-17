import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";


@Injectable()
export class MessageService {
    private messages: Message[];
    messageEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) { }

    appUrl : string = "https://mean-messanger.herokuapp.com/";
    addMessage(message: Message) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post(this.appUrl+'message/' + token, JSON.stringify(message), { headers: headers })
            .map((response: Response) => {
                const result = response.json().obj;
                const message = new Message(
                    result.content,
                    (result.user.firstName + " " + result.user.lastName).toUpperCase(),
                    result._id,
                    result.user._id
                );
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }

    getMessages() {
        return this.http.get(this.appUrl+'message')
            .map((response: Response) => {
                let messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(
                        message.content,
                        (message.user.firstName + " " + message.user.lastName).toUpperCase(),
                        message._id,
                        message.user._id
                    ))
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }

    editMessage(message: Message) {
        this.messageEdit.emit(message);
    }

    updateMessage(message: Message) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch(this.appUrl+'message/' + message.messageId + token, JSON.stringify(message), { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(this.appUrl+'message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }


}