import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, HttpModule , Response } from '@angular/http';
import { KioContentRouterComponent } from './kio-content-router.component';
import { KioBackendService } from '../../services/kio-backend.service'

let MockedBackendService = { provide: KioBackendService, useValue: {}}


describe('KioContentRouterComponent', () => {
  let componentInstance: KioContentRouterComponent;
  let fixture: ComponentFixture<KioContentRouterComponent>;
  let backendService : KioBackendService;
  
  beforeEach(() => {

    TestBed.configureTestingModule({
      //imports: [HttpModule],
      declarations: [ KioContentRouterComponent ],
      providers: [KioBackendService]
    })
    /*.overrideComponent(KioContentRouterComponent,{
      set: {
        providers: [
          KioBackendService
        ]
      }
    })
    .compileComponents();*/
    fixture = TestBed.createComponent(KioContentRouterComponent)
    componentInstance = fixture.componentInstance
    backendService = fixture.debugElement.injector.get(KioBackendService)
  })

  beforeEach(async(() => {
    //fixture = TestBed.createComponent(KioContentRouterComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(componentInstance).toBeTruthy();
  });
});
