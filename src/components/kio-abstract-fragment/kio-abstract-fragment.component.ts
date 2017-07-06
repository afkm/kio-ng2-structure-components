import * as Rx from 'rxjs'
import { Component, Host, EventEmitter, ViewChild, TemplateRef, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core'
import { KioAbstractComponent } from '../kio-abstract/kio-abstract.component'
import { KioAbstractContentComponent } from '../kio-abstract-content/kio-abstract-content.component'
import { KioAbstractLazyComponent } from '../kio-abstract-lazy/kio-abstract-lazy.component'
import { KioFragmentModel, KioContentModel, KioNode, KioContentState } from 'kio-ng2'
import { 
  ComponentLoader, KioComponentLoader,
  KioComponentRoot,
  componentLoaderFactory,
  COMPONENT_NODE, COMPONENT_LOADER 
} from '../../lazyload'

function findParent(parent:KioNode,node:KioNode) {
  if ( !node )
    return undefined

  if ( parent.cuid === node.cuid )
  {
    return node
  }

  if ( !node.parent )
    return undefined

  return findParent(parent,node.parent)
}




@Component({
  template: ''
})
export class KioAbstractFragmentComponent extends KioAbstractLazyComponent<KioFragmentModel> implements OnInit, OnDestroy, AfterViewInit {
  
  protected _node:KioFragmentModel

  protected childComponents:Component[]

  protected registerComponent(){
    this.registerComponentForLazyLoading()
  }

  

  ngAfterViewInit(){
    //super.ngAfterViewInit()

  }

  ngOnDestroy(){
    super.ngOnDestroy()
  }

}
