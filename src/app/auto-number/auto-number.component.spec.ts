import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoNumberComponent } from './auto-number.component';

describe('AutoNumberComponent', () => {
  let component: AutoNumberComponent;
  let fixture: ComponentFixture<AutoNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
