import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected _loginService = inject(LoginService);
  protected _router = inject(Router);
  protected loginForm: FormGroup;
  protected loginError: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.loginForm.get(controlName)?.hasError(errorType) &&
      this.loginForm.get(controlName)?.touched
    );
  }

  login() {
    this.loginError = false;
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    const remember = this.loginForm.get('rememberMe')?.value;
    this._loginService.login(username, password, remember).subscribe((success) => {
      if (success) {
        this._router.navigate(['/home']);
      } else {
        this.loginError = true;
      }
    });
  }
}
