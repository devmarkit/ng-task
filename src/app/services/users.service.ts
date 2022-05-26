import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, shareReplay } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private httpClient: HttpClient) {}

    getAllUsers(): Observable<any> {
        return this.httpClient.get<any>(`users`).pipe(shareReplay())
    }
}
