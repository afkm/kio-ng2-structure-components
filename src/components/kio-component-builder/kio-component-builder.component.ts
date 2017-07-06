import { ActivatedRoute, Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import { Input, Injector, Component, QueryList, ContentChildren, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnInit } from '@angular/core';
import { PublicationComponents } from '../../PublicationComponents.generated'
import { KioAbstractComponent } from '../../components/kio-abstract/kio-abstract.component'
import { ContentMockingService } from 'kio-ng2-component-routing'
import { TestData } from './TestData'
import * as LazyLoad from '../../lazyload'
import * as KioComponentFactory from '../../factory'

import { KioContentModel, KioFragmentModel, KioContentState } from 'kio-ng2'

import { PublicationFixtures } from '../../PublicationFixtures.generated'
import { PublicationCriterias } from '../../PublicationCriterias.generated'

interface ComponentBuilderData {
  componentName?:string;
  componentNames?:string[];
  componentData?:any;
}

/**
 * TODO Kio Module 
 * Service Provider with PublicationComponents exported as value
 */

@Component({
  selector: 'kio-component-builder',
  templateUrl: './kio-component-builder.component.html',
  styleUrls: ['./kio-component-builder.component.css'] 
})
export class KioComponentBuilderComponent implements OnInit {

  constructor(
    private route : ActivatedRoute, 
    private router : Router, 
    private componentFactoryResolver : ComponentFactoryResolver,
    protected injector:Injector
  ) { }

  @ViewChild('componentAnchor', {read: ViewContainerRef}) 
  mountPoint:ViewContainerRef
  data:ComponentBuilderData={}
  dataOptions:any[];
  component:LazyLoad.KioDataComponentRef
  componentState:KioContentState=KioContentState.idle

  private mockingService:ContentMockingService=new ContentMockingService()
  private _dataOptionName:any;

  set dataOptionName ( optionName:any ) {
    this._dataOptionName = optionName
    if ( this.component )
    {
      this.selectOption ( optionName )
    }
  }

  selectOption ( optionName:string ) {
    const option = this.dataOptions.find ( opt => opt.name === optionName )
    if ( option )
    {
      this.component.instance.node = option.data
    }
  }

  get dataOptionName () : any {
    return this._dataOptionName
  }

  mockDataForComponent ( componentName : string ) {
    let testData = TestData.find ( data => data.componentName === componentName )
    if ( testData )
    {
      return testData.data
    }
    return this.mockingService.getFixtureForComponent(componentName)
  }

  get isMounted(){
    return this.mountPoint.length > 0
  }

  unmountComponent () {
    while ( this.mountPoint.length > 0 )
    {
     this.mountPoint.remove(0)
    }
    this.component = null
  }


  private _componentName:string

  set componentName ( name : string ) {
    if ( this._componentName !== name )
    {
      this.router.navigate(['/','dev',name])
    }
  }

  get componentName():string {
    return this._componentName || null
  }
  
  mountComponent() {
    this.unmountComponent()
    if ( !this._componentName )
      return
    
    this.data.componentName = this._componentName
    //const SelectedComponent : LazyLoad.KioComponent<KioContentModel> = PublicationComponents.find ( comp => comp.name === this._componentName + 'Component' )
    //const resolvedComponent = this.componentFactoryResolver.resolveComponentFactory(SelectedComponent)
    //const resolvedComponent = LazyLoad.createFactoryForComponentItem(this.componentFactoryResolver,SelectedComponent)
    
    const mockedNode = this.mockDataForComponent(this._componentName)
    const componentItem = KioComponentFactory.componentItemByName(this._componentName)
    const componentLoader = KioComponentFactory.resolveComponentLoader(this.injector)
    componentLoader.loaderStateChanges.subscribe(nextState => {
      this.componentState = nextState
    },console.error)
    this.component = KioComponentFactory.createComponentItemOnViewContainer<LazyLoad.KioDataComponent,LazyLoad.ComponentNode>(componentItem,this.componentFactoryResolver,this.mountPoint,mockedNode,this.injector,componentLoader)
    
    //this.component = <ComponentRef<KioAbstractComponent<KioContentModel>>>this.mountPoint.createComponent(resolvedComponent)
    if ( !mockedNode )
    {
      throw Error ( 'no fixture available for "' + this._componentName + '"!' )
    }
    if ( Array.isArray ( mockedNode ) )
    {
      this.dataOptions = mockedNode
      if ( this.dataOptionName )
      {
        const idx = mockedNode.findIndex ( item => item.name === this.dataOptionName )
        if ( idx === -1 )
        {
          this.dataOptionName = mockedNode[0].name
        }
      }else
      {
        this.dataOptionName = mockedNode[0].name
      }
      this.selectOption ( this.dataOptionName )
    }
    /*else 
    {
      this.component.instance.node = mockedNode
    }*/
    return this.component
    //componentRef.instance.node = this.node
  }

  ngOnInit() {
    this.data = Object.assign({},this.data,{componentNames: PublicationComponents.map ( c => c.name.replace ( /Component$/ , '' ) )})
    this.route.params.subscribe ( ( params ) => {
      this._componentName = params["ComponentName"]
      this.mountComponent()
    } )
  }

}
