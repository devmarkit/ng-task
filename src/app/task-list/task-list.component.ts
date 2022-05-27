import { Component, OnInit } from '@angular/core'
import { combineLatest, map, Observable } from 'rxjs'
import { TasksService } from '../services/tasks.service'
import { Task } from '../models/task'
import { Router } from '@angular/router'
import { User } from '../models/user'
import { UsersService } from '../services/users.service'
import { TaskData } from '../models/TaskData'

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
    subscriberData$: Observable<TaskData> | undefined

    constructor(
        private tasksService: TasksService,
        private userService: UsersService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.subscriberData$ = combineLatest([
            this.tasksService.getAllTasks(),
            this.userService.getAllUsers(),
        ]).pipe(
            map(([tasks, users]) => {
                return { tasks, users }
            })
        )
    }

    showTask(task: Task) {
        this.router.navigateByUrl(`/view/details/${task.id}`)
    }

    getUsername(assigneeId: string, users: User[]): string | undefined {
        return users.find((element) => element.id == assigneeId)?.name
    }
}
