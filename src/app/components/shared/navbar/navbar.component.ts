import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink, LoaderComponent]
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoading = false;
  loadingMessage = "loader has stopped";

  startLoader(loadingMessage: string) {
    this.isLoading = true;
    this.loadingMessage = loadingMessage;
  }

  stopLoader() {
    this.isLoading = false;
    this.loadingMessage = "Loader has stopped";
  }
  

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.startLoader("Log out");
    this.authService.logout();
    this.stopLoader();
  }
}
