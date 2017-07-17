import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MessageComponent } from "./message.component";
import { MessageListComponent } from "./message-list.component";
import { MessageInputComponent } from "./message-input.component";
import { MessagesComponent } from "./messages.component";



@NgModule({
    declarations : [
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
    ],
    imports : [
        FormsModule,
        CommonModule        
    ],
    providers : [
        //
    ]
})

export class MessageModule{
    //
}