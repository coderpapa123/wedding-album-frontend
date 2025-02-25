import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from "../shared/loader/loader.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, LoaderComponent]
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  loadingMessage = "loader Has Stopped";

  startLoader(loadingMessage: string) {
    this.isLoading = true;
    this.loadingMessage = loadingMessage;
  }

  stopLoader() {
    this.isLoading = false;
    this.loadingMessage = "Loader has stopped";
  }

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {
    if(localStorage.getItem('token')) this.router.navigate(['/']);
  }

  loginUser() {
    this.startLoader('Checking the credentials. Please wait');
    this.authService.login(this.email, this.password);
    this.stopLoader();
  }
}
