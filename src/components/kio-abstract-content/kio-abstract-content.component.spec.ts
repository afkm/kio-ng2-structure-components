import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioAbstractContentComponent } from './kio-abstract-content.component';

describe('KioAbstractContentComponent', () => {
  let component: KioAbstractContentComponent;
  let fixture: ComponentFixture<KioAbstractContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioAbstractContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioAbstractContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
