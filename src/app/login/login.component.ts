import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../services/authentication.service'
import { first } from 'rxjs'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    // @ts-ignore
    loginForm: FormGroup
    loading = false
    submitted = false
    // @ts-ignore
    returnUrl: string
    error = ''

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService
    ) {
        if (this.authService.userValue) this.router.navigate(['/'])
    }

    ngOnInit(): void {
        this.initForm()
        this.returnUrl = this.route.snapshot.queryParams['signin'] || '/'
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    get f() {
        return this.loginForm.controls
    }

    onSubmit() {
        this.submitted = true
        if (this.loginForm.invalid) return

        this.loading = true
        this.authService
            .login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe(
                () => {
                    this.router.navigate(['/view/home'])
                },
                (error) => {
                    this.error = error
                    this.loading = false
                }
            )
    }
}
