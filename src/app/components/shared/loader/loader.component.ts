import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  imports: [CommonModule]
})
export class LoaderComponent {
  @Input() message: string = "loading";
  @Input() isLoading: boolean = true; // Control visibility of loader
}
