import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioAbstractRouterComponent } from './kio-abstract-router.component';

describe('KioAbstractRouterComponent', () => {
  let component: KioAbstractRouterComponent;
  let fixture: ComponentFixture<KioAbstractRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioAbstractRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioAbstractRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
