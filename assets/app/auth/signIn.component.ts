import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";
import { User } from "./user.model";


@Component({
    selector : 'app-signIn',
    templateUrl : './signIn.component.html'
})

export class SignInComponent{
    signInForm : FormGroup;

    constructor(private authService : AuthService, private router : Router) {}

    OnSubmit(){
        const user = new User(this.signInForm.value.email, this.signInForm.value.password)
        this.authService.signIn(user)
                        .subscribe(
                            (data) => {
                                localStorage.setItem('token', data.token);
                                localStorage.setItem('User Id', data.userId);
                                this.router.navigateByUrl('/messages');
                            },
                            (error) => {
                                console.error(error)
                            }
                        )
        this.signInForm.reset();
    }
    ngOnInit(){
        this.signInForm = new FormGroup({
            email : new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password : new FormControl(null, Validators.required),
        })
    }

}