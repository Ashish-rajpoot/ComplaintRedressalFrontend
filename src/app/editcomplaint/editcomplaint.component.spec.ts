import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcomplaintComponent } from './editcomplaint.component';

describe('EditcomplaintComponent', () => {
  let component: EditcomplaintComponent;
  let fixture: ComponentFixture<EditcomplaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditcomplaintComponent]
    });
    fixture = TestBed.createComponent(EditcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
