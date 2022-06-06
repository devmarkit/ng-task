import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { TaskListComponent } from './task-list/task-list.component'
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AddTaskComponent } from './add-task/add-task.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TaskDetailsComponent } from './task-details/task-details.component'
import { LoginComponent } from './login/login.component'
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor'
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HomeComponent } from './home/home.component'

@NgModule({
    declarations: [
        AppComponent,
        TaskListComponent,
        AddTaskComponent,
        TaskDetailsComponent,
        LoginComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BasicAuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
