import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AddEditUserDialogComponent implements OnInit, OnDestroy{
  @Input() isOpen: boolean = false; // Controls modal visibility
  @Input() user: User | null = null; // Receives user data for editing
  @Output() close = new EventEmitter<void>(); // Event to close modal
  @Output() save = new EventEmitter<any>(); // Event to save changes
  isNewUser = false;

  constructor() {
  }

  ngOnInit(): void {
    if(!this.user) {
      this.isNewUser = true;
      this.user = {
        _id:"",
        username: "",
        email: "",
        password: "",
        role: ""
      }
    }
  }

  ngOnDestroy(): void {
    this.isNewUser = false;
  }

  onSave() {
    this.save.emit(this.user); // Pass updated user data
    this.onCancel(); // Close modal after saving
  }

  onCancel() {
    this.close.emit(); // Emit close event
  }
}
