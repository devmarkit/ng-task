import { RouterModule, Routes } from '@angular/router'
import { TaskListComponent } from './task-list/task-list.component'
import { NgModule } from '@angular/core'
import { AddTaskComponent } from './add-task/add-task.component'
import { TaskDetailsComponent } from './task-details/task-details.component'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './guards/auth.guard'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
    {
        path: 'view/tasks',
        component: TaskListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'view/addtask',
        component: AddTaskComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'view/details/:taskId',
        component: TaskDetailsComponent,
        canActivate: [AuthGuard],
    },

    {
        path: 'view/signin',
        component: LoginComponent,
    },
    {
        path: 'view/home',
        component: HomeComponent,
    },
    {
        path: '**',
        redirectTo: 'view/signin',
    },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
