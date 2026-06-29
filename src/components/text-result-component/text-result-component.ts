
import { Component, Input, inject, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormatterService, OcrWord } from '../../core/services/text-formatter';
import {OcrStatsComponent} from '../ocr-stats-component/ocr-stats-component'
import {Icon} from '../../shared/icon/icon'
@Component({
  selector: 'app-text-result',
  standalone: true,
  imports: [CommonModule, Icon, OcrStatsComponent],
  templateUrl: './text-result-component.html',
  styleUrl: './text-result-component.scss',
})
export class TextResultComponent {
  private formatter = inject(TextFormatterService);

  @Input() words: OcrWord[] = [];

  text = signal<string>('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['words']) {
      this.text.set(
        this.formatter.format(this.words ?? [])
      );
    }
  }

  copy() {
    navigator.clipboard.writeText(this.text());
  }

}
