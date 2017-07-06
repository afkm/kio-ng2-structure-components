import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioImageComponent } from './kio-image.component';

describe('KioImageComponent', () => {
  let component: KioImageComponent;
  let fixture: ComponentFixture<KioImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
