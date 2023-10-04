import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetComplaintComponent } from './get-complaint.component';

describe('GetComplaintComponent', () => {
  let component: GetComplaintComponent;
  let fixture: ComponentFixture<GetComplaintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetComplaintComponent]
    });
    fixture = TestBed.createComponent(GetComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
