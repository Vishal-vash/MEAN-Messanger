import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from "./message.service";
import { NgForm } from "@angular/forms/forms";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
})


export class MessageInputComponent implements OnInit {
    constructor(private messageService: MessageService) {
        //
    }
    message: Message;
    onSave(form: NgForm) {
        if (this.message) {
            this.message.content = form.value.contentInput;
            this.messageService.updateMessage(this.message)
                                .subscribe((res : Message) => {
                                   console.log("Update : " + res);
                                });
            this.message = null;
        }
        else {
            let message = new Message(form.value.contentInput, "Vishal Vasishat");
            this.messageService.addMessage(message)
                                .subscribe(
                                    data => console.log(data),
                                    error => console.error("Error" + JSON.stringify(error))
                                );
        }
        form.resetForm();
    }

    onClear(form : NgForm){
        this.message = null;
        form.resetForm();
    }

    ngOnInit(){
        this.messageService.messageEdit.subscribe((res) => {
            this.message = res;
        })
    }
}