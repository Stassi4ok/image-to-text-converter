import { Component, signal } from '@angular/core';
import { ImageUploadComponent } from '../components/image-upload-component/image-upload-component';
import { TextResultComponent } from '../components/text-result-component/text-result-component';
import {  OcrWord } from '../core/services/text-formatter';
import { AnimatedBgComponent } from '../components/animated-bg-component/animated-bg-component'
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ImageUploadComponent, TextResultComponent, AnimatedBgComponent],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  protected readonly title = signal('image-to-text-converter');

  ocrWords = signal<OcrWord[]>([]);

  handleWords(words: OcrWord[]) {
    
    this.ocrWords.set(words);
    console.log(this.ocrWords());
  }
}