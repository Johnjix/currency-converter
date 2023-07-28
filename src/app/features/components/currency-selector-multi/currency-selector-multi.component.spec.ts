import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySelectorMultiComponent } from './currency-selector-multi.component';

describe('CurrencySelectorMultiComponent', () => {
  let component: CurrencySelectorMultiComponent;
  let fixture: ComponentFixture<CurrencySelectorMultiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CurrencySelectorMultiComponent]
    });
    fixture = TestBed.createComponent(CurrencySelectorMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
