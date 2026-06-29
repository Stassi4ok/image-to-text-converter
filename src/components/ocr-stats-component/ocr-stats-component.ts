import { Component, input, computed } from '@angular/core';
import { OcrWord } from '../../core/services/text-formatter';

@Component({
  selector: 'app-ocr-stats',
  standalone: true,
  templateUrl: './ocr-stats-component.html',
  styleUrls: ['./ocr-stats-component.scss'],
})
export class OcrStatsComponent {
  words = input<OcrWord[]>([]);

  characters = computed(() =>
    this.words().reduce((sum, w) => sum + w.text.length, 0)
  );

  lines = computed(() => this.calculateLines(this.words()));

  private calculateLines(words: OcrWord[]): number {
    if (!words.length) return 0;

    const sorted = [...words].sort(
      (a, b) => a.bounding_box.y1 - b.bounding_box.y1
    );

    const tolerance = 10;
    const groups: number[] = [];

    for (const w of sorted) {
      const y = w.bounding_box.y1;

      const index = groups.findIndex(g => Math.abs(g - y) <= tolerance);

      if (index === -1) {
        groups.push(y);
      } else {
        groups[index] = (groups[index] + y) / 2;
      }
    }

    return groups.length;
  }
}