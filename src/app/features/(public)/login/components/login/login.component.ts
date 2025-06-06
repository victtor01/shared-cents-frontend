import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/core/services/auth-service';

@Component({
  selector: 'login-component',
  templateUrl: './form.component.html',
  imports: [RouterModule, ReactiveFormsModule, MatIconModule],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isSubmited: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    this.isSubmited = true;

    if (this.loginForm.invalid) {
      console.log('Formulário inválido');
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const res = this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/workspaces']);
      },
      error: (err) => {
        console.log('Houve um erro');
      },
    });

    console.log(res);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
