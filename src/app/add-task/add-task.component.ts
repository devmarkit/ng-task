import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TasksService } from '../services/tasks.service'
import { Observable, throwError } from 'rxjs'
import { UsersService } from '../services/users.service'
import * as uuid from 'uuid'
import { Router } from '@angular/router'
import { User } from '../models/user'

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
    // @ts-ignore
    form: FormGroup
    // @ts-ignore
    users$: Observable<User[]> | undefined

    constructor(
        private fb: FormBuilder,
        private tasksService: TasksService,
        private userService: UsersService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initForm()
        this.users$ = this.userService.getAllUsers()
    }

    initForm() {
        this.form = this.fb.group({
            info: ['', [Validators.required]],
            assigneeId: ['', [Validators.required]],
            done: [false],
        })
    }

    saveTask() {
        const val = this.form.value
        this.tasksService.addNewTask({ id: uuid.v4(), ...val }).subscribe(
            () => {
                this.router.navigateByUrl('view/tasks')
            },
            (err) => {
                return throwError(err)
            }
        )
    }
}
