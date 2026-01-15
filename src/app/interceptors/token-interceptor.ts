import { HttpInterceptorFn } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
    const _authService = getAuthService();
    const router = getRouter();
    const isLoggedIn = _authService.isLoggedIn();
    // console.log("isLoggedIn", isLoggedIn);
    // console.log("request", _authService.getCurrentToken());
    //const isApiUrl = request.url.startsWith(environment.apiUrl) 
    const token = localStorage.getItem('token')?.replace(/"/g, "");    
    if (isLoggedIn && !request.url.includes("login")) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token?.trim()}`
            }
        });
    }
    else {                
        return next(request);
    }
    
    return next(request).pipe(        
        catchError(error => {
            if (!error.error?.clientMessage) {
                console.log("error", error);
                //router.navigate([`/error/page/${error.status}`]);
            }
            return throwError(() => error);
        })
    );
};

const getAuthService = () => inject(AuthService);
const getRouter = () => inject(Router);