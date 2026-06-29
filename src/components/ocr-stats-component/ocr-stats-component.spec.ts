import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrStatsComponent } from './ocr-stats-component';

describe('OcrStatsComponent', () => {
  let component: OcrStatsComponent;
  let fixture: ComponentFixture<OcrStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OcrStatsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
