import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterCreateComponent } from './matter-create.component';

describe('MatterCreateComponent', () => {
  let component: MatterCreateComponent;
  let fixture: ComponentFixture<MatterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
