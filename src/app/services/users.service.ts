import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user'

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private httpClient: HttpClient) {}

    getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`/users`)
    }
}
