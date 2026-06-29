import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type Particle = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

@Component({
  selector: 'app-animated-bg',
  standalone: true,
  imports: [CommonModule], // 👈 ОЦЕ ВАЖЛИВО
  templateUrl: './animated-bg-component.html',
  styleUrls: ['./animated-bg-component.scss'],
})
export class AnimatedBgComponent implements OnInit {
  particles: Particle[] = [];

  ngOnInit(): void {
    const count = 40;

    this.particles = Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 4 + Math.random() * 10,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.6
    }));
  }
}