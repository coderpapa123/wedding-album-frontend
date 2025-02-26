import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AddEditUserDialogComponent } from '../add-edit-user-dialog/add-edit-user-dialog.component';
import { User } from '../../../models/user.model';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  imports: [FormsModule, CommonModule, AddEditUserDialogComponent, LoaderComponent]
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;
  isModalOpen: boolean = false;
  searchText: string = '';
  isLoading: boolean = false;
  loadingMessage: string = "Loader has stoppped";

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
    this.startLoader("Deleting the User");
    await this.userService.deleteUser(id);
    await this.getAllUsers();
    this.stopLoader();
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
      this.startLoader("Updating the user");
      await this.userService.updateUser(updatedUser._id, updatedUser);
    } else {
      this.startLoader("Creating the user");
      await this.userService.createUser(updatedUser);
    }
    await this.getAllUsers();
    this.closeEditDialog();
    this.stopLoader();
  }

  

  startLoader(loadingMessage: string) {
    this.isLoading = true;
    this.loadingMessage = loadingMessage;
  }

  stopLoader() {
    this.isLoading = false;
    this.loadingMessage = "Loader has stopped";
  }
}
