import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean =  false;
  isAdmin: boolean = false;

  constructor(
    private router: Router, 
    private apiService: ApiService,
    private userService: UserService
  ) {}

  async login(email: string, password: string) {
    try {
      const response = await this.apiService.login({ email, password});
      localStorage.setItem('token', response.data.token);
      const {role, id, username} = response.data.user;
      this.userService.setCurrentUser({email, password, role, _id: id, username})

      this.isAdmin = response.data.user.role.toLocaleLowerCase() === 'admin';
      this.router.navigate(['/dashboard']);
      this.isAuthenticated = true
    } catch (error) {
      this.isAuthenticated = false;
      alert('Invalid credentials');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
