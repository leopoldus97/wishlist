import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCancelComponent } from './buy-cancel.component';

describe('BuyComponent', () => {
  let component: BuyCancelComponent;
  let fixture: ComponentFixture<BuyCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-wish-group', () => {
    expect(component).toBeTruthy();
  });
});
