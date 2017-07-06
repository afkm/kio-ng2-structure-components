import { 
  Component, Input, 
  EventEmitter,
  Optional,
  Inject,
  ElementRef,
  ViewContainerRef,
  ContentChildren,
  ViewChildren,
  QueryList,
  InjectionToken,  
  OnInit, OnDestroy , isDevMode 
} from '@angular/core';
import { KioNodeModel , KioFragmentModel , KioContentModel } from 'kio-ng2'
import { Observable, Subscription } from 'rxjs'
import { AppFeatures } from '../../../config'

import { ScrollService, ScrollableComponent, ScrollableItem, ScrollPosition, ScrollMargin, ScrollState, ScrollDirection } from '../../scrolling'

@Component({
  selector: 'kio-abstract',
  templateUrl: './kio-abstract.component.html',
  styleUrls: ['./kio-abstract.component.css']
})
export class KioAbstractComponent<T extends KioNodeModel> implements OnInit, OnDestroy {


  public static VIEW_PARAMS=new InjectionToken<any>('view_params')

  constructor(
    protected scrollService:ScrollService
    ){
  }

  /** 
   * !!IMPORTANT!!
   * keep the exact order of "viewParams" before "set node" 
   * it's relevant to how props are set in templates
   */
  //@Input() viewParams:any={}

  @Input() set node ( value : T ) {
    this.setNode ( value )
  }

  get node () {
    return this._node
  }

  get hasData() : boolean {
    return !!this._node
  }


	protected _node : T;

	setNode ( node : T ) {
    const prevNode = this._node
		this._node = node
    if ( prevNode !== node )
    {
      this.onNodeUpdate()
      this.onAfterNodeUpdate()
    }
	}



  /**
   * scroll handling
   */
  
  protected _scrollServiceSubscription:Subscription
  
  protected startScrollTracking(scrollMargins:ScrollMargin[],element:ElementRef){
    
    if ( !AppFeatures.isEnabled(AppFeatures.Features.scrollSniffer) ) 
    { 
      return 
    }

    this._scrollServiceSubscription = this.scrollService.registerComponent(this,scrollMargins,element)
    .subscribe(
      ({positions, direction}) => {
        this.onScrollMarginUpdates(positions, direction)
      }
    )
  }

  protected stopScrollTracking(){
    if ( !AppFeatures.isEnabled(AppFeatures.Features.scrollSniffer) ) 
    { 
      return 
    }

    if ( this._scrollServiceSubscription )
    {
      this._scrollServiceSubscription.unsubscribe()
      this._scrollServiceSubscription = null
    }
  }

  protected onScrollMarginUpdates ( positions:number[], direction?:ScrollDirection ) {
    //this.allMarginsVisible = positions.every(pos => pos >= 0 && pos <= 1)
  }

  protected onNodeUpdate ( ) { }

  protected onAfterNodeUpdate() {}

  get isFragment(){
    return this.node && (<any>this.node).isKioFragment
  }

  get isContent() {
    return this.node && (<any>this.node).isKioContent
  }

  ngOnInit(){
    //
  }

  ngOnDestroy(){
    this.stopScrollTracking()
  }

}
