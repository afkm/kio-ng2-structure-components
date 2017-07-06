import { 
  Component, Input, Inject, AfterViewInit, EventEmitter, Output,
  OnInit, OnDestroy 
} from '@angular/core';
import { Response } from '@angular/http'
import { GlobalsService, GlobalsKey } from '../../globals'
import * as i18n from '../../../i18n'
import { KioPublication, KioPublicationModel, KioFragmentModel, KioContentState } from 'kio-ng2'
import { 
  ComponentLoader, KioComponentLoader,
  KioComponentRoot, KioDataComponent,
  COMPONENT_NODE, COMPONENT_LOADER,
  KioComponentLoaderProvider,
  KioComponent
} from '../../lazyload'


export type Global = keyof typeof GlobalsKey

@Component({
  selector: 'kio-static-content',
  templateUrl: './kio-static-content.component.html',
  styleUrls: ['./kio-static-content.component.scss'],
  providers: [
    KioComponentLoaderProvider
  ]
})
export class KioStaticContentComponent implements KioComponentRoot, OnInit, OnDestroy {
  
  constructor ( 
    private globals:GlobalsService, 
    @Inject(COMPONENT_LOADER) readonly componentLoader:ComponentLoader,
    protected localeService:i18n.LocaleService 
  ) { }

  @Output() childStateChanges:EventEmitter<KioContentState>=new EventEmitter()

  node:KioPublicationModel
  error:string

  protected _globalsKey:Global

  @Input() set globalsKey(value:Global){
    if ( !this._globalsKey )
    {
      this._globalsKey = value
      this.loadContent()
    }
  }
  
  get globalsKey():Global {
    return this._globalsKey
  }

  onContentRouterStateChange ( nextState:KioContentState ) {
    //window.afkm.logger.add(this,[`content state child event ${nextState}. Emitting to output`])
    this.childStateChanges.emit(nextState)
  }

  loadContent () {
    this.globals.getByKey(this.globalsKey)
    .subscribe ( data => {
      this.node = new KioPublicationModel(data)
      //console.log('loaded static data', this.node)      
    }, error => {
      this.error = error
      console.log ( 'Failed to load data for globals key: ' + this.globalsKey )
      console.error(error)
    }, () => {
      //console.log('done loading globals "%s"', this.globalsKey )
    } )
  }

  ngOnInit(){
    this.subscribeToLocaleChanges()
  }


  ngOnDestroy(){
    this.unsubscribeFromLocaleChanges()
  }

  ngAfterViewInit(){
    this.componentLoader.setRootComponent(this)
  }


  /** i18n */

  private _localeSubscription

  protected subscribeToLocaleChanges () {
    //window.afkm.logger.add(this,[`%s::subscribeToLocaleChanges`,[this.constructor.name]])
    if ( this._localeSubscription )
      return

    this._localeSubscription = this.localeService.changes.subscribe( nextLocale => {
      this.loadContent()
    } )
  }
  
  protected unsubscribeFromLocaleChanges () {
    if ( this._localeSubscription )
    {
      this._localeSubscription.unsubscribe()
      this._localeSubscription = null
    }
  }  
}
