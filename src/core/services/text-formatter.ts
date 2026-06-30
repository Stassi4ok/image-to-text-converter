import { Injectable } from '@angular/core';

export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface OcrWord {
  text: string;
  bounding_box: BoundingBox;
}

@Injectable({
  providedIn: 'root'
})
export class TextFormatterService {

  format(words: OcrWord[]): string {

    if (!words?.length) {
      return '';
    }

    const sorted = [...words].sort((a, b) => {

      const ay = a.bounding_box.y1;
      const by = b.bounding_box.y1;

      if (Math.abs(ay - by) < 8) {
        return a.bounding_box.x1 - b.bounding_box.x1;
      }

      return ay - by;
    });

    const lines: OcrWord[][] = [];

    for (const word of sorted) {

      const currentY = word.bounding_box.y1;

      let line = lines.find(l =>
        Math.abs(l[0].bounding_box.y1 - currentY) < 8
      );

      if (!line) {
        line = [];
        lines.push(line);
      }

      line.push(word);
    }

    return lines
      .map(line =>
        line
          .sort((a, b) => a.bounding_box.x1 - b.bounding_box.x1)
          .map(w => w.text)
          .join(' ')
      )
      .join('\n');
  }

}