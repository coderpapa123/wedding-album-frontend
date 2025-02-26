import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  albums: Album[] | null;

  constructor(private apiService: ApiService) {
    this.albums = null;
  }

  async createAlbum(album: Album) {
    if(album) {
      await this.apiService.createAlbum(album);
      await this.getAlbums();
    }
  }

  async uploadImage(file: File) {
    return await this.apiService.uploadImage(file);
  }

  async getAlbums() {
    try {
      const response = await this.apiService.getAlbums();
      this.albums = response.data
    } catch (error) {
      // Catch the error
    }
  }

  async getAllAlbums() {
    try {
      const response = await this.apiService.getAllAlbums();
      return response.data;
    } catch (error) {
      // Catch the error
    }
  }

  async deleteAlbum(id: string) {
    await this.apiService.deleteAlbum(id);
    await this.getAlbums();
  }
}
