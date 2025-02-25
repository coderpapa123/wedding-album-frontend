import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: any;
  private currentUser: User | null ;

  constructor(
    private apiService: ApiService
  ) {
    this.currentUser = null;
   }


  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  async createUser(data: any) {
    try {
      await this.apiService.register(data);
      this.getUsers();
    } catch (error) {
      alert('Error while creating the user. Please try again');
    }
  }


  async getUsers() {
    try {
      const response = await this.apiService.getUsers();
      this.users = response.data;
    } catch (error) {
      this.users = null;
      alert('Error while fetching the users. Please try again');
    }
  }

  async updateUser(id: string, user: User) {
    try {
      await this.apiService.updateUser(id, user);
      this.getUsers();
    } catch (error) {
      alert('Error while updating the user');
    }
  }

  async deleteUser(id: string) {
    try {
      await this.apiService.deleteUser(id);
    } catch (error) {
      alert('Error while deleting the user. Please try again');
    }
  }
}
