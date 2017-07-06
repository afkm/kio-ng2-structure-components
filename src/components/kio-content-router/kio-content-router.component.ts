import { 
  Optional, Inject,
  Output, EventEmitter,
  Component, ComponentRef, ElementRef, ComponentFactoryResolver, ViewContainerRef, ViewChild , Input, Injector, 
  ContentChildren, QueryList
} from '@angular/core';
import { KioAbstractComponent } from '../kio-abstract/kio-abstract.component'
import { KioNode, KioContentModel, KioFragmentModel, KioNodeModel, KioNodeType, KioContentState } from 'kio-ng2'
import { matchComponent, getAllComponents, getComponentAt, getComponentIndexForNode } from 'kio-ng2-component-routing'
import { ScrollService, ScrollableComponent, isScrollableComponent, ScrollDirection, ScrollEvent } from '../../scrolling'
import { LocaleService } from '../../../i18n'

import * as KioComponentFactory from '../../factory'
import * as LazyLoad from '../../lazyload'

@Component({
  selector: 'kio-content-router',
  templateUrl: './kio-content-router.component.html',
  styleUrls: ['./kio-content-router.component.scss']
})
export class KioContentRouterComponent <T extends KioContentModel> extends KioAbstractComponent<T> {

  constructor (
      @Optional() @Inject(LazyLoad.COMPONENT_LOADER) readonly componentLoader:LazyLoad.ComponentLoader, 
      protected scrollService:ScrollService, 
      private componentFactoryResolver : ComponentFactoryResolver, 
      private injector:Injector,
      protected localeService:LocaleService 
    ) {
    super(scrollService)
  }

  linksToContent:boolean=false
  linkModifier:string
  componentError:string
  contentState:KioContentState=KioContentState.idle

  _params:any={}
  @Input() set params ( val:any ) {
    this._params = val
    this.applyParams()
  }

  @Output() stateChanges:EventEmitter<KioContentState>=new EventEmitter()

  get params () : any {
    return this._params
  }

  protected applyParams () {
    if ( this.componentRef )
    {
      for(let paramKey in this._params) {
        this.componentRef.instance [ paramKey ] = this._params [ paramKey ]
      }
    }
  }

  /** 
   * abstract
   */
  routedIndex:number=-1

  get routedComponent():any{
    return this.childComponents[this.routedIndex]
  }

  get componentName():string{
    const routedComponent = this.routedComponent
    if ( routedComponent )
    {
      return routedComponent.name
    }
    return 'None'
  }

  /*protected matchChildComponent ( ChildComponent ) : boolean {
    const componentName = ChildComponent.name.replace ( /Component$/ , '' )
    return ComponentCriterias[componentName] && matchComponent(ComponentCriterias[componentName])(<any>this.node)
  }*/

  /*protected getRoutedIndex ( ): number {
    return this.childComponents.findIndex ( ( ChildComponent ) => this.matchChildComponent ( ChildComponent ) )
  }*/

  @ViewChild('mountPoint', {read: ViewContainerRef})
  mountPoint:ViewContainerRef
  @ViewChild('mountPointElement')
  mountPointElement:ElementRef


  @ViewChild('mountPointLink', {read: ViewContainerRef})
  mountPointLink:ViewContainerRef
  @ViewChild('mountPointLinkElement')
  mountPointLinkElement:ElementRef

  protected componentRef:LazyLoad.KioComponentRef

  //protected _node : KioNode;
  protected onNodeUpdate ( ) {
    if ( this._node )
    {
      //this.linkModifier = this._node.modifiers.find ( mod => mod.startsWith ( 'link--' ) )    
      //this.linksToContent = !!this.linkModifier 

      this.routedIndex = getComponentIndexForNode(this.node)
      this.mountChildComponent()
    }
  }

  get hideMountPoint():boolean{
    return !this.hasData || this.routedIndex < 0
  }

  get nodeType () : string {
    if ( !this.node )
    {
      console.trace ( 'trying to access "nodeType" before node was set.' ) 
      return null
    }
    const type = this.node.type
    return type
  }

  protected get childComponents() : any[] {
    if ( !this.hasData )
      return []
    return getAllComponents()
  }
  
  protected unmountComponent () {
    while ( this.mountPoint.length > 0 )
    {
     this.mountPoint.remove(0)
    }
  }

  protected get mountContainer():ViewContainerRef {
    return this.mountPoint
  }

  protected get mountContainerElement():ElementRef {
    return this.mountPointElement
  }

  protected mountChildComponent() {
    if ( !this.mountPoint )
    {
      return
    }

    this.unmountComponent()
    if ( this.routedIndex < 0 )
    {
      return 
    }

    const mountViewContainer : ViewContainerRef = this.mountContainer


    let componentLoader:LazyLoad.ComponentLoader = this.componentLoader ? this.componentLoader.createChildLoader() : KioComponentFactory.resolveComponentLoader ( this.injector )
    //window.afkm.logger.observe(componentLoader,'stateChanges','KioContentRouter '+this.node.cuid)
    this.componentRef = KioComponentFactory.createComponentOnViewContainer<LazyLoad.KioComponentRoot,LazyLoad.ComponentNode> (
      this.componentFactoryResolver,
      mountViewContainer,
      this.node,
      this.injector,
      componentLoader,
      this._params.viewParams
    )
    //this.applyParams()

    componentLoader.stateChanges.subscribe ( next => {
      //window.afkm.logger.add(this,[`component loader state changed to ${next}. Emitting to output`])
      this.contentState = next
      this.stateChanges.emit(next)
    } )
  }

}
