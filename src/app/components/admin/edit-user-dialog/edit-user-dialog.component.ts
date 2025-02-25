import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  imports: [FormsModule, CommonModule]
})
export class EditUserDialogComponent {
  @Input() isOpen: boolean = false; // Controls modal visibility
  @Input() user: User | null = { username: '', email: '', password: '', role:'', _id: '' }; // Receives user data for editing
  @Output() close = new EventEmitter<void>(); // Event to close modal
  @Output() save = new EventEmitter<any>(); // Event to save changes
  isNewUser = false;

  constructor() {
  }

  onSave() {
    this.save.emit(this.user); // Pass updated user data
    this.onCancel(); // Close modal after saving
  }

  onCancel() {
    this.close.emit(); // Emit close event
  }
}
