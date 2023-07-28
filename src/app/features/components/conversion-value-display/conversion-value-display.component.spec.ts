import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionValueDisplayComponent } from './conversion-value-display.component';

describe('ConversionValueDisplayComponent', () => {
  let component: ConversionValueDisplayComponent;
  let fixture: ComponentFixture<ConversionValueDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConversionValueDisplayComponent]
    });
    fixture = TestBed.createComponent(ConversionValueDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
