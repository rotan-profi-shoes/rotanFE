import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutContainer } from './admin-layout.container';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutContainer;
  let fixture: ComponentFixture<AdminLayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLayoutContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
