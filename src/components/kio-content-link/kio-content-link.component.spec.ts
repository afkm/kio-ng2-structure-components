import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioContentLinkComponent } from './kio-content-link.component';

describe('KioContentLinkComponent', () => {
  let component: KioContentLinkComponent;
  let fixture: ComponentFixture<KioContentLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioContentLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioContentLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
