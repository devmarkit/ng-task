import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthenticationService } from '../services/authentication.service'

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const user = this.authService.userValue
        const isLoggedIn = !!localStorage.getItem('user')
        if (user && isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            })
        }
        return next.handle(request)
    }
}
