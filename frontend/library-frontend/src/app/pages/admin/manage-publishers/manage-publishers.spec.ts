import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublishers } from './manage-publishers';

describe('ManagePublishers', () => {
  let component: ManagePublishers;
  let fixture: ComponentFixture<ManagePublishers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePublishers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePublishers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
