import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.scss'],
  imports: [CommonModule]

})
export class AlbumViewerComponent implements OnInit, OnDestroy {
  images: string[] = localStorage.getItem('images')?.split(',') || [];
  
  selectedImage: string | null = this.images[0];
  stars: any[] = [];
  blinkClass = "animate-blink";
  description: string = "A beautiful collection of wedding memories.";

  constructor() {}

  ngOnInit() {
    this.generateStars();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('images');
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  generateStars() {
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1, // Random size between 1px and 4px
        speed: Math.random() * 2 + 1 // Speed between 1s and 3s
      });
    }
  }
}