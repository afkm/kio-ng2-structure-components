/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KioRouterComponent } from './kio-router.component';

describe('KioRouterComponent', () => {
  let component: KioRouterComponent;
  let fixture: ComponentFixture<KioRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
