import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, FormsModule, LoaderComponent]
})
export class DashboardComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  albums: Album[] | null = [];
  title = '';
  description = '';
  files: FileList | null = null;
  isLoading: boolean = false;
  loadingMessage: string = "loading";

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    } else {
      this.authService.isAuthenticated = true;
    }
  }

  async ngOnInit() {
    this.startLoader('Loading Your Albums...');
    await this.albumService.getAlbums();
    this.albums = this.albumService.albums;
    this.stopLoader();
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
    const currentUser = this.userService.getCurrentUser();

    if (
      this.files && this.files.length > 0 &&
      this.title !== "" && 
      this.description !== ""
    ) {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const response = await this.albumService.uploadImage(file);
        imageUrls.push(response.data.imageUrl);
      }

      const album: Album = { 
        title: this.title,
        description: this.description,
        images: imageUrls, 
        user: currentUser?._id, 
        username: currentUser?.username 
      }

      await this.albumService.createAlbum(album);
      this.albums = this.albumService.albums;
      this.title = '';
      this.fileInput.nativeElement.file = null;
      this.stopLoader();
    } else {
      this.stopLoader();
    }
  }

  async deleteAlbum(id?: string) {
    if(id) {
      this.startLoader("Deleting the album");
      await this.albumService.deleteAlbum(id);
      this.albums = this.albumService.albums;
      this.stopLoader();
    }
  }

  navigateToAlbumPage(album: any) {
    localStorage.setItem('images', album.images);
    this.router.navigate(['/album']);
  }
}
