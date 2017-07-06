import * as Rx from 'rxjs'
import { Component, Input, OnInit, Output, EventEmitter, ViewChildren, QueryList, OnChanges, SimpleChanges, SimpleChange } from '@angular/core'
import { KioAbstractFragmentComponent } from '../kio-abstract-fragment/kio-abstract-fragment.component'
import { KioContentRouterComponent } from '../kio-content-router/kio-content-router.component'
import { KioContentState, KioContentModel, KioFragmentModel } from 'kio-ng2'


@Component({
  selector: 'kio-list',
  templateUrl: './kio-list.component.html',
  styleUrls: ['./kio-list.component.css']
})
export class KioListComponent extends KioAbstractFragmentComponent {

  protected onNodeUpdate () {}

  @ViewChildren(KioContentRouterComponent) childRouter:QueryList<KioContentRouterComponent<KioContentModel|KioFragmentModel>>

  stateChanges:EventEmitter<KioContentState>=new EventEmitter()

  private _routerSubscriptions:Rx.Subscription[]

  private _childRouterStates:KioContentState[]

  protected updateRouter ( childRouter:KioContentRouterComponent<KioContentModel|KioFragmentModel>[] ) {
    if ( this._routerSubscriptions )
    {
      this._routerSubscriptions.forEach ( s => s.unsubscribe() )      
    }
    this._childRouterStates = []
    this._routerSubscriptions = childRouter.map ( (router,idx) => router.stateChanges.subscribe ( next => {
      this._childRouterStates[idx] = next
      if ( this._childRouterStates.every( state => state === next ) )
      {
        this.stateChanges.emit(next)
      }
    } ) )

  }

  ngOnChanges(changes:SimpleChanges){
    if ( changes['childRouter'] && changes['childRouter'].currentValue )
    {
      this.childRouter.changes.subscribe ( childRouter => {
        this.updateRouter(childRouter)
      } )
    }
  }

}
