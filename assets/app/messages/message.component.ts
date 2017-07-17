import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from "./message.service";

@Component({
    selector : 'app-message',
    templateUrl : './message.component.html',
    styleUrls : []
})

export class MessageComponent{
    @Input() message : Message;

    constructor(private messageService : MessageService){
        //
    }

    onEdit(){
        this.messageService.editMessage(this.message)
    }

    onDelete(){
        this.messageService.deleteMessage(this.message)
                            .subscribe(res => console.log("Successfull Deletion"));
    }

    belongsToUser(){
        return localStorage.getItem('User Id') == this.message.userId;

    }
}