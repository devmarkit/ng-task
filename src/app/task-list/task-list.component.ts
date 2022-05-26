import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { TasksService } from '../services/tasks.service'
import { Task } from '../models/task'
import { Router } from '@angular/router'

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    tasks$: Observable<Task[]> | undefined

    constructor(private tasksService: TasksService, private router: Router) {}

    ngOnInit(): void {
        this.tasks$ = this.tasksService.getAllTasks()
    }

    showTask(task: Task) {
        this.router.navigateByUrl(`/view/details/${task.id}`)
    }
}
