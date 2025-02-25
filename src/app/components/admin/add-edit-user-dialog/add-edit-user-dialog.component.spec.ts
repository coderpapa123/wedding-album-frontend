import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserDialogComponent } from './add-edit-user-dialog.component';

describe('EditUserDialogComponent', () => {
  let component: AddEditUserDialogComponent;
  let fixture: ComponentFixture<AddEditUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditUserDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
