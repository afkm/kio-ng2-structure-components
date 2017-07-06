import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioListComponent } from './kio-list.component';

describe('KioListComponent', () => {
  let component: KioListComponent;
  let fixture: ComponentFixture<KioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
