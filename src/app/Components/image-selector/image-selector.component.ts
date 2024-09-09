import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {
  constructor(
  ) { }

  // selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null | undefined = undefined;

  @Input() placeholder!: string;

  // Émetteur pour retourner le FormData mis à jour
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
      };

      reader.readAsDataURL(file);

      // save image to variables
      if (this.selectedFile) {
        this.fileSelected.emit(this.selectedFile);
      }
    }
  }

  fileBrowseHandler(event: any) {
    console.log(event.target.files);
  }
}
