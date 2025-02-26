import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Album } from '../../../models/album.model';
import { AlbumService } from '../../../services/album.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-manage-albums',
  templateUrl: './manage-albums.component.html',
  styleUrls: ['./manage-albums.component.css'],
  imports: [CommonModule, LoaderComponent]
})
export class ManageAlbumsComponent implements OnInit {
  albums: Album[] | null;
  isLoading: boolean = false;
  loadingMessage: string = "Loader has stopped";

  constructor(
    private albumService: AlbumService,
    private apiService: ApiService
  ) {
    this.albums = null;
    this.startLoader("Loading All Albums");
  }

  async ngOnInit() {
    this.albums = await this.albumService.getAllAlbums();
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

  async deleteAlbum(id?: string) {
    if(id) {
      this.startLoader("Deleting the album");
      await this.albumService.deleteAlbum(id);
      this.albums = await this.albumService.getAllAlbums();
      this.stopLoader();
    }
  }
}
