import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { AppModule } from "src/app/app.module";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { LoginUser } from "../model/loginUser.model";
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {
    
    user = new BehaviorSubject({});
    loginDetails: LoginUser[] = [];
    entry: any;
    pmsLoginService = 'pmsLogin/';
    pmsRegisterService = 'pmsRegister/';
    pmsPasswordService = 'pmsPassword/';
    pmsLockService = 'pmsLock/';
    
    tokenTimeOut: any;
    constructor(
        private http: HttpClient,
        private router: Router,
        private config: AppModule,
    ) { }

    customErrorHandler(errorResponse: HttpErrorResponse) {
        let errorText = 'Unknown error occured';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorText);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorText = 'Email already Exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorText = 'Email entered does not Exists/ Invalid EmailId';
                break;
            case 'INVALID_PASSWORD':
                errorText = `'You've entered the wrong password'`;
                break;
        }
        return throwError(errorText);
    }

    authenticate(username: string, password: string) {
        const url = "authenticate";
        return this.http.post<any>(this.config.resourceUrl + this.pmsLoginService + url, { username, password }).pipe(
            map(
                userData => {
                    if(userData != null){
                    localStorage.setItem('loginResponse', userData);
                    localStorage.setItem('username', userData.name);
                    localStorage.setItem('emailId', userData.emailId);
                    let tokenStr = 'Bearer ' + userData.accessToken;
                    localStorage.setItem('token', tokenStr);
                    localStorage.setItem('expirationDuration', userData.expirationDuration);
                    localStorage.setItem('role',userData.role);
                    this.autoLogout(userData.expirationDuration );
                    return userData;
                    }
                    else{
                        return null;
                    }
                }
            )
        );
    }

    isUserLoggedIn() {
        let user = localStorage.getItem('username')
        console.log(!(user === null))
        return !(user === null)
    }

    // To keep the user logged-in untill the access token expires after user's first login
    autoLogin() {
        //if user logged-in, the data will persist in local storage
        const loginData = localStorage.getItem('loginData') !== null;
        //check for local storage data
        if (!loginData) {
            return;
        }
        //Extracting local storage data for continuing further 
        const resData = JSON.parse(JSON.stringify(localStorage.getItem('loginData')));
        const { firstName, lastName, userType, userId, expirationDuration, access_token } = resData;
        //checking access token time left and perform auto logout on idle or estimated timeout
        if (resData.access_token) {
            this.user.next(resData);
            const expiration_time = new Date(resData.expirationDuration).getTime() - new Date().getTime();
            this.autoLogout(expiration_time);
        }
        this.router.navigate(['/admin']);
    }

    //autologout on expiration timeout of access token
    autoLogout(expirationDuration: number) {
        console.log("Auto - logout called")
        this.tokenTimeOut = setTimeout(() => {
            this.logout();
            console.log("token expired");
        }, expirationDuration * 1000);
       
    }

    //logout function which removes local storage data which was made in login function
    logout() {
        console.log("logout is called")
        this.user.next({});
        this.router.navigate(['/auth']);
        localStorage.removeItem('loginData');
        if (this.tokenTimeOut) {
            clearTimeout(this.tokenTimeOut);
        }
        this.tokenTimeOut = null;
    }

    changePassword(passwordData: { username: any; oldPassword: any; newPassword: any; confirmNewPassword: any; }) {
        const url = 'changePassword';
        console.log(passwordData);
        return this.http.post<any>(this.config.resourceUrl + this.pmsPasswordService + url,  passwordData ).pipe(
            map(
                userData => {
                    console.log("inside changePassword: ", userData)
                    return userData;
                }
            )
        );

    }

    lockAccount(username: string) {
        const url = 'lockAccount';
        console.log(username);
        return this.http.post<any>(this.config.resourceUrl + this.pmsLockService + url, username).pipe(
            map(userData=>{
                console.log(userData);
                return userData;
            })
        );
      }

    patientRegister(RegisterData: any) {
        const url = 'register';
        const parameters = new HttpParams().set('title', RegisterData.title)
            .set('password', RegisterData.password)
            .set('firstName', RegisterData.firstName)
            .set('lastName', RegisterData.lastName)
            .set('emailId', RegisterData.emailId)
            .set('dateOfBirth', RegisterData.dateOfBirth)
            .set('confirmPassword', RegisterData.confirmPassword)
            .set('contactNumber', RegisterData.contactNumber);
        return this.http.post(this.config.resourceUrl + this.pmsRegisterService + url, parameters)
            .pipe(catchError(this.customErrorHandler),
                tap((resData: any) => {
                    console.log("Registration Completed - API hit success:", resData);
                })
            )
    }
}

