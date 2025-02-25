import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AddEditUserDialogComponent } from '../add-edit-user-dialog/add-edit-user-dialog.component';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  imports: [FormsModule, CommonModule, AddEditUserDialogComponent]
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;
  isModalOpen: boolean = false;
  searchText: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }


  async getAllUsers() {
    await this.userService.getUsers();
    this.users = this.userService.users;

  }

  filteredUsers() {
    return this.users.filter((user: User) =>
      user.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  async deleteUser(id: string) {
    await this.userService.deleteUser(id);
    this.getAllUsers();
  }

  openEditDialog(user: User) {
    if (user) this.selectedUser = { ...user };
    this.isModalOpen = true;
  }

  openAddUserDialog() {
    this.selectedUser = null;
    this.isModalOpen = true;
  }

  closeEditDialog() {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

  async saveUser(updatedUser: User) {
    const index = this.users.findIndex((u: any) => u.email === updatedUser.email);
    if (index !== -1) {
      await this.userService.updateUser(updatedUser._id, updatedUser);
      this.getAllUsers();
    } else {
      await this.userService.createUser(updatedUser);
      this.getAllUsers();
    }
    this.closeEditDialog();
  }
}
