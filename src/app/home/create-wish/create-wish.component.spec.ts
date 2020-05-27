import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWishComponent } from './create-wish.component';

describe('CreateComponent', () => {
  let component: CreateWishComponent;
  let fixture: ComponentFixture<CreateWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-wish-group', () => {
    expect(component).toBeTruthy();
  });
});
