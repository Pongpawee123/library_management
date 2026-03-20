import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBorrows } from './my-borrows';

describe('MyBorrows', () => {
  let component: MyBorrows;
  let fixture: ComponentFixture<MyBorrows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBorrows]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBorrows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
