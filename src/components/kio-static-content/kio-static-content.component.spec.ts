import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioStaticContentComponent } from './kio-static-content.component';

describe('KioStaticContentComponent', () => {
  let component: KioStaticContentComponent;
  let fixture: ComponentFixture<KioStaticContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioStaticContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioStaticContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
