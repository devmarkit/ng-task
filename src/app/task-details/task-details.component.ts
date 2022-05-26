import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { map, Observable, tap } from 'rxjs'
import { TasksService } from '../services/tasks.service'
import { Task } from '../models/task'

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
    task$: Observable<Task> | undefined

    constructor(
        private route: ActivatedRoute,
        private taskService: TasksService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const taskId = this.route.snapshot.paramMap.get('taskId')
        // @ts-ignore
        this.task$ = this.taskService.getById(taskId)
    }

    changeStatus(status: boolean) {
        this.task$ = this.task$?.pipe(
            map((task) => {
                const taskTmp = { ...task, done: !status }
                this.taskService.updateTask(taskTmp).subscribe(() => {})
                return taskTmp
            }),
            tap(() => this.router.navigateByUrl('/view/tasks'))
        )
    }
}
