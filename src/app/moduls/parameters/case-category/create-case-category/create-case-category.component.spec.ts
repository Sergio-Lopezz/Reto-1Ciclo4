import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaseCategoryComponent } from './create-case-category.component';

describe('CreateCaseCategoryComponent', () => {
  let component: CreateCaseCategoryComponent;
  let fixture: ComponentFixture<CreateCaseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCaseCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
