// @ts-nocheck
import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { User } from '../models/user'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>
    public user$: Observable<User>

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('user'))
        )
        this.user$ = this.userSubject.asObservable()
    }

    public get userValue(): User {
        return this.userSubject.value
    }

    login(email: string, password: string) {
        return this.http.post('/signin', { email, password }).pipe(
            map((user: any) => {
                user['user'].authdata = window.btoa(email + ':' + password)
                localStorage.setItem('user', JSON.stringify(user['user']))
                user['user'].accessToken = user.accessToken
                this.userSubject.next(user)
                return user
            })
        )
    }

    logout() {
        localStorage.removeItem('user')
        this.userSubject.next(null)
        this.router.navigate(['/signin'])
    }
}
