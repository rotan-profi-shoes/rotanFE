import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesTableComponent } from './shoes-table.component';

describe('ShoesTableComponent', () => {
  let component: ShoesTableComponent;
  let fixture: ComponentFixture<ShoesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
