import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesInfoComponent } from './shoes-info.component';

describe('ShoesInfoComponent', () => {
  let component: ShoesInfoComponent;
  let fixture: ComponentFixture<ShoesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
