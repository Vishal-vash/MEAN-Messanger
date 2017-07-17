import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/Rx";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {

    constructor(private http : Http, private errorService : ErrorService) {}
    appUrl : string = "http://localhost:3000/";
    signUp(user : User){
        const headers = new Headers({'Content-Type' :  'application/json'});
        return this.http.post(this.appUrl+'user', JSON.stringify(user), {headers : headers})
                 .map((res : Response) => res.json())
                 .catch((error : Response) => {
                        this.errorService.handleError(error.json());
                        return Observable.throw(error.json());
                    })
    }

    signIn(user : User){
        const headers = new Headers({'Content-Type' :  'application/json'});
        return this.http.post(this.appUrl+'user/signin', JSON.stringify(user), {headers : headers})
                 .map((res : Response) => res.json())
                 .catch((error : Response) => {
                        this.errorService.handleError(error.json());
                        return Observable.throw(error.json());
                    })
    }

    logOut(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}
