import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReservations } from './manage-reservations';

describe('ManageReservations', () => {
  let component: ManageReservations;
  let fixture: ComponentFixture<ManageReservations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageReservations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageReservations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
