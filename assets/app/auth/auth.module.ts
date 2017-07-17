import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { LogoutComponent } from "./logout.component";
import { SignUpComponent } from "./signUp.component";
import { SignInComponent } from "./signIn.component";
import { AuthRouting } from "./auth.routing";


@NgModule({
    declarations : [
        LogoutComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports : [
        ReactiveFormsModule,
        CommonModule,
        AuthRouting
    ],
    providers : []
})

export class AuthModule{
    //
}