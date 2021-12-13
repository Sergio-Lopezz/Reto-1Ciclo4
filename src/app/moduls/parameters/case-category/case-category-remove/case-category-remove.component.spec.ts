import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCategoryRemoveComponent } from './case-category-remove.component';

describe('CaseCategoryRemoveComponent', () => {
  let component: CaseCategoryRemoveComponent;
  let fixture: ComponentFixture<CaseCategoryRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseCategoryRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCategoryRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
