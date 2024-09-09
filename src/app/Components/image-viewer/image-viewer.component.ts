import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {
  @Input() src!: string;
  isViewerOpen = false;

  openImageViewer() {
    this.isViewerOpen = true;
  }

  closeImageViewer() {
    this.isViewerOpen = false;
  }
}