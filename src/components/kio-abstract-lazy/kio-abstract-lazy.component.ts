import { 
  Component, 
  Input,
  EventEmitter,
  Inject, Injector,
  Optional, Host,
  AfterViewInit, OnInit, OnDestroy 
} from '@angular/core'
import { KioContentModel, KioFragmentModel, KioContentState } from 'kio-ng2'
import { 
  ComponentLoader, KioComponentLoader,
  KioComponentRoot, KioComponentLoaderProvider,
  COMPONENT_NODE, COMPONENT_LOADER 
} from '../../lazyload'
import { KioAbstractComponent } from '../kio-abstract/kio-abstract.component'
import { ScrollService } from '../../scrolling'
import { KioBackendService } from '../../services/kio-backend.service'
import { LocaleService } from '../../../i18n/locale.service'
import { KioWindowEventService } from '../../services/kio-window-event.service'


export enum ViewState {
  mounting=0,
  mounted,
  resizing,
  unmounting
}


@Component({
  template: ``,
  providers: [
    KioComponentLoaderProvider
  ]
})
export class KioAbstractLazyComponent <T extends KioContentModel|KioFragmentModel> extends KioAbstractComponent<T> implements AfterViewInit, OnInit, OnDestroy {
  
  protected static ViewState=ViewState

  constructor(
    @Optional() @Inject(KioAbstractComponent.VIEW_PARAMS) viewParams:any={},
    @Optional() @Host() @Inject(COMPONENT_NODE) protected _nodeParam:T, 
    @Inject(COMPONENT_LOADER) readonly componentLoader:ComponentLoader,    
    protected backendService:KioBackendService, 
    protected scrollService:ScrollService,
    protected localeService:LocaleService, 
    protected windowEventService:KioWindowEventService, 
    protected injector:Injector
    ) {
    super(scrollService)


    if ( viewParams )
    {
      this.viewParams = viewParams
    }
    
    if ( this._nodeParam )
    {
      this.setNode(this._nodeParam)
    }
  }

  @Input() public viewParams:any

  isHostView:boolean=false

  canAnimateContent:boolean=true

  stateChanges:EventEmitter<KioContentState>=new EventEmitter()

  viewStateChanges:EventEmitter<ViewState>=new EventEmitter()

  private _contentState:KioContentState=KioContentState.idle
  
  private _viewState:ViewState=ViewState.mounting



  ngOnInit(){
    //window.afkm.logger.observe(this,'stateChanges')
    super.ngOnInit()
  }

  ngOnDestroy(){
    this.contentState = KioContentState.unmounting
    super.ngOnDestroy()    
  }

  ngAfterViewInit(){
    this.registerComponentForLazyLoading()
  }



  get contentState():KioContentState {
    return this._contentState
  }

  set contentState(nextState:KioContentState){
    if ( this._contentState === nextState )
      return
    this._contentState = nextState
    process.nextTick(()=>{
      this.stateChanges.emit(nextState)
    })
  }
  

  get viewState():ViewState {
    return this._viewState
  }

  set viewState(nextViewState:ViewState){
    if ( this._viewState === nextViewState )
      return
    this._viewState = nextViewState
    process.nextTick(()=>{
      this.viewStateChanges.emit(nextViewState)
    })
  }
  
  
  get isLoading():boolean {
    return this._contentState === KioContentState.loading
  }

  hasState ( state:KioContentState|string ) : boolean {
    if ( 'string' === typeof state )
      return this.hasState ( KioContentState[state] )
    return state === this._contentState
  }


  protected registerComponentForLazyLoading ( ) {

    this.componentLoader.addChild(this)
  }

}