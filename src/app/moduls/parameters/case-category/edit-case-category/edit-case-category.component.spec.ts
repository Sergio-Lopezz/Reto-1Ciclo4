import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCaseCategoryComponent } from './edit-case-category.component';

describe('EditCaseCategoryComponent', () => {
  let component: EditCaseCategoryComponent;
  let fixture: ComponentFixture<EditCaseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCaseCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCaseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
