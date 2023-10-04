import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyushiComponent } from './ayushi.component';

describe('AyushiComponent', () => {
  let component: AyushiComponent;
  let fixture: ComponentFixture<AyushiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AyushiComponent]
    });
    fixture = TestBed.createComponent(AyushiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
