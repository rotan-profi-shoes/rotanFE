import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesCopyFormComponent } from './shoes-copy-form.component';

describe('ShoesCopyFormComponent', () => {
  let component: ShoesCopyFormComponent;
  let fixture: ComponentFixture<ShoesCopyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoesCopyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesCopyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
