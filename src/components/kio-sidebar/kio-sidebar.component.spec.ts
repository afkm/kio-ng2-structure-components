import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioSidebarComponent } from './kio-sidebar.component';

describe('KioSidebarComponent', () => {
  let component: KioSidebarComponent;
  let fixture: ComponentFixture<KioSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
