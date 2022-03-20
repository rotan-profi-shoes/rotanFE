import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuManagerComponent } from './sku-manager.component';

describe('SkuManagerComponent', () => {
  let component: SkuManagerComponent;
  let fixture: ComponentFixture<SkuManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
