import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector : 'app-signUp',
    templateUrl : './signUp.component.html'
})

export class SignUpComponent implements OnInit{
    signUpForm : FormGroup;

    constructor(private authService : AuthService) {}

    OnSubmit(){
        const user : User = new User(
            this.signUpForm.value.email,
            this.signUpForm.value.password,
            this.signUpForm.value.firstName,
            this.signUpForm.value.lastName
        );
        this.authService.signUp(user)
                        .subscribe(result => console.log(result))
        this.signUpForm.reset();
    }
    ngOnInit(){
        this.signUpForm = new FormGroup({
            firstName : new FormControl(null, Validators.required),
            lastName : new FormControl(null, Validators.required),
            email : new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password : new FormControl(null, Validators.required),
        })
    }
}