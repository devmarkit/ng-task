import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, shareReplay, throwError } from 'rxjs'
import { Task } from '../models/task'

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    constructor(private httpClient: HttpClient) {}

    getAllTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(`/tasks`).pipe(shareReplay())
    }

    addNewTask(task: Task) {
        return this.httpClient.post(`/tasks`, task).pipe(shareReplay())
    }

    getById(taskId: number | string): Observable<Task> {
        return this.httpClient.get<Task>(`/tasks/${taskId}`).pipe(shareReplay())
    }

    updateTask(task: Task): Observable<Task> {
        return this.httpClient.put<Task>(`/tasks/${task.id}`, task).pipe(
            catchError((err) => {
                return throwError(err)
            }),
            shareReplay()
        )
    }
}
