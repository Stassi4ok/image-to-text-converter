import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextResultComponent } from './text-result-component';

describe('TextResultComponent', () => {
  let component: TextResultComponent;
  let fixture: ComponentFixture<TextResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextResultComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
