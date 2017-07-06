import { 
	Host, InjectionToken, Component, ContentChildren, QueryList, 
	OnDestroy, AfterViewInit,
	Optional, Output, EventEmitter, Injector, Inject 
} from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { KioAbstractComponent } from '../kio-abstract/kio-abstract.component'
import { KioAbstractLazyComponent } from '../kio-abstract-lazy/kio-abstract-lazy.component'
import { KioContentState, KioContentModel, KioFragmentModel, KioNodeModel, isCtnFragment } from 'kio-ng2'

import { KioBackendService } from '../../services/kio-backend.service'
import { LocaleService } from '../../../i18n/locale.service'
import { AppFeatures } from '../../../config'
import { KioWindowEventService } from '../../services/kio-window-event.service'
import { ScrollService, ScrollableComponent, ScrollableItem, ScrollPosition, ScrollMargin, ScrollState, ScrollDirection } from '../../scrolling'

import { 
	ComponentLoader, KioComponentLoader,
	KioComponentRoot, KioComponentLoaderProvider,
	COMPONENT_NODE, COMPONENT_LOADER 
} from '../../lazyload'

//import { componentLoaderFactory } from '../../factory/kio-component-loader.factory'

@Component({
  selector: 'app-kio-abstract-content',
  template: '',
  styles: [],
  providers: [
  	KioComponentLoaderProvider
  ]
})
export class KioAbstractContentComponent extends KioAbstractLazyComponent<KioContentModel> implements OnDestroy, AfterViewInit {

	// constructor(
	// 	protected scrollService:ScrollService, 
	// 	protected backendService:KioBackendService, 
	// 	protected localeService:LocaleService, 
	// 	protected windowEventService:KioWindowEventService, 
	// 	protected injector:Injector
	// )
	// {
	// 	super(scrollService,scrollService,injector)
	// 	/*console.groupCollapsed(`KioAbstractContentComponent::constructor(${this.constructor.name})`)
	// 	console.log('_nodeParam',this._nodeParam)
	// 	console.groupEnd()*/

	// 	if ( this._nodeParam )
 //    {
 //      this.setNode(this._nodeParam)
 //    }		
	// }

	// canAnimateContent:boolean=true
	// isHostView:boolean=!!this._nodeParam

	@Output() onData=new EventEmitter<any>()

	// private _stateChanges:EventEmitter<KioContentState>

	// get stateChanges():EventEmitter<KioContentState> {
	// 	if ( !this._stateChanges )
	// 	{
	// 		this._stateChanges = new EventEmitter<KioContentState>()			
	// 	}
	// 	return this._stateChanges
	// }

	// private _contentState:KioContentState=KioContentState.idle
	// get contentState():KioContentState {
	// 	return this._contentState
	// }
	// set contentState(nextState:KioContentState) {
	// 	this._contentState = nextState
	// 	process.nextTick(()=>{
	// 		this.stateChanges.emit(nextState)
	// 	})
	// }

	// protected registerComponent(){
	// 	if ( !this.componentLoader )
	// 	{
	// 		console.log('No component service for', this)
	// 	}
	// 	else {
	// 		if ( this._nodeParam ) // is host view
	// 		{
	// 			//this.componentLoader.setRootComponent(this)

	// 		}else {
	// 			this.componentLoader.addChild(this)
	// 		}
	// 	}
	// }

	// hasState ( state:KioContentState|string ) : boolean {
	// 	state = KioContentState[state]
	// 	return state === this.contentState
	// }

	/*waitForState ( state:KioContentState ):Observable<this> {
		if ( state < this._contentState )
			return Observable.throw(Error(`state "${KioContentState[state]}" already exceeded with "${KioContentState[state]}".`))
		if ( state ===  this._contentState )
			return Observable.of(this)
		return this.stateChanges.single ( next => next === state ).mapTo(this)
	}*/

	//protected _node : KioContentModel;

	setNode ( node : KioContentModel ) {
		const update = this._node !== node
		super.setNode ( node )
		//this.registerComponent()
		if ( update && this.data )
		{
			this.setData(null)
		}
	}
	
	data : any;
	setData ( data : any ) {
		if ( !data )
		{
			this.contentState = KioContentState.idle
			this.data = null
		}
		else 
		{
			//this.contentState = KioContentState.loaded
			this.data = data
			this.onUpdate()
			this.onData.emit ( data )
		}
	} 

	protected onNodeUpdate ( ) {
		// if ( !this.data && !isCtnFragment(this.node.type) )
		// {			
		// 	this.loadNodeContent ()
		// }		
	}

	protected onAfterNodeUpdate() {
		super.onAfterNodeUpdate()
		this.loadNodeContent()
	}

	protected onUpdate () {
		//
	}

	error : any;
	setError ( error : Error|string|null ) {
		this.error = error
		this.contentState = KioContentState.error
	}
	
	// override in subclass component to pass query params for stuff like responsive content
	getContentParams():any {
		return {}
	}

	protected canLoadContentWithParams ( contentParams:any ):boolean {
		return true
	}

  protected onBeforeLoad() {}

	// get isLoading():boolean {
	// 	return this.contentState === KioContentState.loading
	// }

	loadContent (contentParams?:any) {
		return this.backendService.loadNodeContent (this.node, contentParams).map ( result => result.data )
	}

	loadNodeContent () {
		if ( this.backendSubscription )
		{
			//console.log('cancel loading "%s"', this.node.cuid )
			this.unsubscribeBackend()
		}
		
		this.onBeforeLoad()
		this.contentState = KioContentState.loading
		const contentParams = this.getContentParams()
		//Logger.LogContext ( this, 'content params' , contentParams )

		/*if ( !this.canLoadContentWithParams (contentParams) )
		{
			console.warn('Refused to load data for "%s" with content params:' , this._node.cuid, contentParams )
			return
		}*/

		this.backendSubscription = this.loadContent(contentParams).subscribe (
				( data ) => {
					//console.log ( 'content data received' , data )
					this.setData(data)
				} ,
				( error ) => {
					this.contentState = KioContentState.error
					console.error ( error )
				} ,
				() => {
					//console.log('done loading content "%s"', this.node.cuid )
					this.unsubscribeBackend()
				}
			)
	}

	onContentLoadError(error?:any,...args:any[]){
		//window.afkm.logger.add(this,['Error on %s:',[this.constructor,error]])
	}

	private backendSubscription : any;
	private unsubscribeBackend () {
		if ( this.backendSubscription )
		{
			this.backendSubscription.unsubscribe()
			this.backendSubscription = null
		}
	}

	/** i18n */

	private _localeSubscription

	protected subscribeToLocaleChanges () {
		//window.afkm.logger.add(this,[`%s::subscribeToLocaleChanges`,[this.constructor.name]])
		if ( this._localeSubscription )
			return

		this._localeSubscription = this.localeService.changes.subscribe( nextLocale => {
			this.loadNodeContent()
		} )
	}
	
	protected unsubscribeFromLocaleChanges () {
		if ( this._localeSubscription )
		{
			this._localeSubscription.unsubscribe()
			this._localeSubscription = null
		}
	}

	ngOnInit(){
		super.ngOnInit()
		//this.subscribeToLocaleChanges()
	}



  ngOnDestroy(){
		this.contentState = KioContentState.unmounting
		this.unsubscribeBackend()
		this.unsubscribeFromLocaleChanges()
    this.componentLoader.destroy()
	}

	ngAfterViewInit() {
		super.ngAfterViewInit()
		this.updateContentState()
	}

	protected updateContentState () {
		if ( this.hasData && this.contentState === KioContentState.loading )
		{
			this.contentState = KioContentState.loaded
		}
	}
}
