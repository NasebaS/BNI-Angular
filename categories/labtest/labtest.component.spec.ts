import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabtestComponent } from './labtest.component';

describe('LabtestComponent', () => {
  let component: LabtestComponent;
  let fixture: ComponentFixture<LabtestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
