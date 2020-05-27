import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWishComponent } from './edit-wish.component';

describe('EditComponent', () => {
  let component: EditWishComponent;
  let fixture: ComponentFixture<EditWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create-wish-group', () => {
    expect(component).toBeTruthy();
  });
});
