import { Routes, RouterModule } from "@angular/router";

import { SignUpComponent } from "./signUp.component";
import { SignInComponent } from "./signIn.component";
import { LogoutComponent } from "./logout.component";

const AUTH_ROUTES : Routes = [
    {path : '' , redirectTo : 'signUp', pathMatch : 'full'},
    {path : 'signUp' , component : SignUpComponent},
    {path : 'signIn' , component : SignInComponent},
    {path : 'logout' , component : LogoutComponent}
]

export const AuthRouting = RouterModule.forChild(AUTH_ROUTES)