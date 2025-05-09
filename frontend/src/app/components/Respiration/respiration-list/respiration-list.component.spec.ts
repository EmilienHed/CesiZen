import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespirationListComponent } from './respiration-list.component';

describe('RespirationListComponent', () => {
  let component: RespirationListComponent;
  let fixture: ComponentFixture<RespirationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespirationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespirationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
