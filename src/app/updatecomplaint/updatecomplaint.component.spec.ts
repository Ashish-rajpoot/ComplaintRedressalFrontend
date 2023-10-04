import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecomplaintComponent } from './updatecomplaint.component';

describe('UpdatecomplaintComponent', () => {
  let component: UpdatecomplaintComponent;
  let fixture: ComponentFixture<UpdatecomplaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatecomplaintComponent]
    });
    fixture = TestBed.createComponent(UpdatecomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
