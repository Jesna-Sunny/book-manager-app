import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registered! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => (this.errorMessage = 'Registration failed. Try a different username.'),
    });
  }
}