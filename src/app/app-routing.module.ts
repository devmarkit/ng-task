import { RouterModule, Routes } from '@angular/router'
import { TaskListComponent } from './task-list/task-list.component'
import { NgModule } from '@angular/core'
import { AddTaskComponent } from './add-task/add-task.component'
import { TaskDetailsComponent } from './task-details/task-details.component'

const routes: Routes = [
    {
        path: 'view/tasks',
        component: TaskListComponent,
    },
    {
        path: 'view/addtask',
        component: AddTaskComponent,
    },
    {
        path: 'view/details/:taskId',
        component: TaskDetailsComponent,
    },
    {
        path: '**',
        redirectTo: 'view/tasks',
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
