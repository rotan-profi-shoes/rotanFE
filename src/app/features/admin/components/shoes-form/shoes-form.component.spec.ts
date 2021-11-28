import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesFormComponent } from './shoes-form.component';

describe('ShoesFormComponent', () => {
  let component: ShoesFormComponent;
  let fixture: ComponentFixture<ShoesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
