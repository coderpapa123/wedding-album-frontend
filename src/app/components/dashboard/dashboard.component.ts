import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  albums: any[] = [];
  title = '';
  image: File | null = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.fetchAlbums();
  }

  async fetchAlbums() {
    const response = await this.apiService.getAlbums();
    this.albums = response.data;
  }

  async createAlbum() {
    let imageUrl = '';

    if (this.image) {
      const response = await this.apiService.uploadImage(this.image);
      imageUrl = response.data.imageUrl;
    }

    await this.apiService.createAlbum({ title: this.title, images: imageUrl });
    this.title = '';
    this.image = null;
    this.fetchAlbums();
  }

  async deleteAlbum(id: string) {
    await this.apiService.deleteAlbum(id);
    this.fetchAlbums();
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }
}
