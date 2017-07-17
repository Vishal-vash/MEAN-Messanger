import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";


@Component({
    selector : 'app-authentication',
    template : `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li routerLinkActive = 'active' *ngIf="!isLoggedIn()"><a [routerLink] = "['signUp']">Sign Up</a></li>
                    <li routerLinkActive = 'active' *ngIf="!isLoggedIn()"><a [routerLink] = "['signIn']">Sign In</a></li>
                    <li routerLinkActive = 'active' *ngIf="isLoggedIn()"><a [routerLink] = "['logout']">Logout</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})

export class AuthenticationComponent implements OnInit{
    constructor(private authService : AuthService, private router : Router) {};

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    ngOnInit(){
        if(this.isLoggedIn()){
            this.router.navigate(['auth', 'logout']);
        }
    }
}