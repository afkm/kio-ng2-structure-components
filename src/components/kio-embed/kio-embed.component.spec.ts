import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioEmbedComponent } from './kio-embed.component';

describe('KioEmbedComponent', () => {
  let component: KioEmbedComponent;
  let fixture: ComponentFixture<KioEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
