import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, FormsModule, LoaderComponent]
})
export class DashboardComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  albums: any[] = [];
  title = '';
  files: FileList | null = null;
  isLoading: boolean = false;
  loadingMessage: string = "loading";

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {
    if(!localStorage.getItem('token')) {
       this.router.navigate(['/login']);
    } else {
       this.authService.isAuthenticated = true;     
    }
  }

  async ngOnInit() {
    this.startLoader('Loading Your Albums...');
    this.fetchAlbums();
    this.stopLoader();
  }

  async fetchAlbums() {
    const response = await this.apiService.getAlbums();
    this.albums = response.data;
  }

  getFiles() {
    const filesElement = this.fileInput.nativeElement as HTMLInputElement;
    if (filesElement.files) {
      this.files = filesElement.files
    }  
  }

  startLoader(loadingMessage: string) {
    this.isLoading = true;
    this.loadingMessage = loadingMessage;
  }

  stopLoader() {
    this.isLoading = false;
    this.loadingMessage = "Loader has stopped";
  }

  async createAlbum() {
    this.startLoader("Please wait. We are creating the album");
    let imageUrls: string[] = [];
    this.getFiles(); 

    if (this.files && this.files.length > 0 && this.title !== "") {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const response = await this.apiService.uploadImage(file);
        imageUrls.push(response.data.imageUrl);
      }

      await this.apiService.createAlbum({ title: this.title, images: imageUrls });
      this.title = '';
      this.fileInput.nativeElement.file = null;
      await this.fetchAlbums();
      this.stopLoader();
    } else {
      this.stopLoader();
    }
  }

  async deleteAlbum(id: string) {
    this.startLoader("Deleting the album");
    await this.apiService.deleteAlbum(id);
    await this.fetchAlbums();
    this.stopLoader();;
  }

  navigateToAlbumPage(album: any) {
    localStorage.setItem('images', album.images);
    this.router.navigate(['/album']);
  }
}
