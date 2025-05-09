import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespirationPracticeComponent } from './respiration-practice.component';

describe('RespirationPracticeComponent', () => {
  let component: RespirationPracticeComponent;
  let fixture: ComponentFixture<RespirationPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespirationPracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespirationPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
