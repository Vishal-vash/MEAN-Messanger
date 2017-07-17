import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { MessageModule } from "./messages/message.module";
import { AuthModule } from "./auth/auth.module";

//App Components Import
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./commons/header.component";
import { ErrorComponent } from "./errors/error.component";

//App Routing Import
import { AppRoutes } from "./app.routing";


//App Services Import 
import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./errors/error.service";


@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutes,
        MessageModule,
        AuthModule
    ],
    providers : [
        AuthService,
        ErrorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    //
}