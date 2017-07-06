import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioComponentBuilderComponent } from './kio-component-builder.component';

describe('KioComponentBuilderComponent', () => {
  let component: KioComponentBuilderComponent;
  let fixture: ComponentFixture<KioComponentBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioComponentBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioComponentBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
