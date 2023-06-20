import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCrudComponent } from './display-crud.component';

describe('DisplayCrudComponent', () => {
  let component: DisplayCrudComponent;
  let fixture: ComponentFixture<DisplayCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayCrudComponent]
    });
    fixture = TestBed.createComponent(DisplayCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
