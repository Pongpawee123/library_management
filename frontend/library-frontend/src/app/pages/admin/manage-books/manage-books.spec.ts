import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBooks } from './manage-books';

describe('ManageBooks', () => {
  let component: ManageBooks;
  let fixture: ComponentFixture<ManageBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
