import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcrService } from '../../core/services/ocr';
import { OcrWord } from '../../core/services/text-formatter';
import {Icon} from '../../shared/icon/icon'
@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './image-upload-component.html',
  styleUrls: ['./image-upload-component.scss']
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  errorMessage: string | null = null;
  response: string | null = null;

  private readonly maxSize = 2 * 1024 * 1024; // 2MB
  private readonly ocrService = inject(OcrService);

  @Output() ocrWordsChange = new EventEmitter<OcrWord[]>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    this.clearPreview();

    const isValidType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png';

    if (!isValidType) {
      this.errorMessage = 'Only JPEG and PNG images are allowed.';
      return;
    }

    if (file.size > this.maxSize) {
      this.errorMessage = 'File size must be less than 2MB.';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = null;
    this.previewUrl = URL.createObjectURL(file);

   
    this.sendToOcr(file);
  }

  private sendToOcr(file: File): void {
    this.ocrService.extractText(file).subscribe({
      next: (res) => {
        const words: OcrWord[] = (res ?? []).map((item: any) => ({
          text: item.text,
          bounding_box: item.bounding_box,
        }));

        this.response = words.map(w => w.text).join(' ');

        
        this.ocrWordsChange.emit(words);
        
      },
      error: (err) => {
        console.error('❌ OCR ERROR:', err);
        this.errorMessage = 'OCR failed. Try again.';
      }
    });
  }

  clearImage(): void {
    this.clearPreview();
    this.selectedFile = null;
    this.response = null;
  }

  private clearPreview(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }

    this.previewUrl = null;
    this.errorMessage = null;
  }
}