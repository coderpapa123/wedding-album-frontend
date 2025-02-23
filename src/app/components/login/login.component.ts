import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  async loginUser() {
    try {
      const response = await this.apiService.login({ email: this.email, password: this.password });
      localStorage.setItem('token', response.data.token);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      alert('Invalid credentials');
    }
  }
}
