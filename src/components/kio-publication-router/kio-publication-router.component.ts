import { Component, Host, EventEmitter, Output, Inject, ViewChild, ElementRef, Input, QueryList, ViewChildren, OnInit, AfterViewInit } from '@angular/core';
import { Router , Routes, ActivatedRoute, Params } from '@angular/router'

import { KioPublication, KioPublicationModel, KioFragmentModel, KioContentState } from 'kio-ng2'
import { 
  ComponentLoader, KioComponentLoader,
  KioComponentRoot, 
  KioComponentLoaderProvider,
  COMPONENT_NODE, COMPONENT_LOADER ,
  ComponentNode
} from '../../lazyload'

import { KioContentRouterComponent } from '../../components/kio-content-router/kio-content-router.component'

@Component({
  selector: 'kio-publication-router',
  templateUrl: './kio-publication-router.component.html',
  styleUrls: ['./kio-publication-router.component.css'],
  providers: [
    KioComponentLoaderProvider
  ]
})
export class KioPublicationRouterComponent implements OnInit, AfterViewInit {

  constructor ( 
    @Inject(COMPONENT_LOADER) public componentLoader:ComponentLoader,
    private route: ActivatedRoute, 
    private router : Router
   ) { }

  publicationData : any;
  @ViewChildren(KioContentRouterComponent) contentRouterComponents:KioContentRouterComponent<ComponentNode>[]

  @Output() stateChanges:EventEmitter<KioContentState>=new EventEmitter()

  @Input() set publication ( pub:KioPublication ) {
    //console.log ( 'KioPublicationRouterComponent - set publication' , pub )
    this.publicationData = pub
  }

  ngOnInit(){
   
  }

  error:string

  isLoading:boolean=true
  hasError:boolean=false

  containerStyle : any = {
    height: 0
  }

  protected startLoading(){
    this.isLoading = true
    this.hasError = false
    this.containerStyle.height = '0px'
  }

  protected stopLoading(error?:any){

    this.isLoading = false
    this.hasError = !!error
    if ( error )
    {
      this.error = `${error}`
    }
    else {
      this.containerStyle.height = 'auto'
    }
    
  }

  routerStateChanges(chapter:KioFragmentModel,state){
    if ( this.contentRouterComponents.filter ( comp => comp.contentState === 2 ).length === this.contentRouterComponents.length )
    {
      this.stateChanges.emit(state)
      this.stopLoading()
    }
  }

  // scrolling
  /*private _scrollWrapperComponents : QueryList<any>
  @ViewChildren('scrollWrapper') set scrollWrapperComponents ( components : QueryList<any> ) {
    this._scrollWrapperComponents = components
    this.containerStyle = {
      height: window.innerHeight + 'px'
    }
  }*/

  // child components
  /*private _viewContainer : ElementRef;
  @ViewChild('container') set viewContainer ( viewChild : ElementRef ) {
    this._viewContainer = viewChild
  }*/

  /*private _viewContent : ElementRef;
  @ViewChild('content') set viewContent ( viewChild : ElementRef ) {
    this._viewContent = viewChild
  }*/


  ngAfterViewInit(){
    
    this.componentLoader.stateChanges.subscribe ( loaderState => {
      console.log('publication router componentLoader(%s) updated state to ', this.componentLoader.id, loaderState )
      this.stateChanges.emit(loaderState)
    } )
  }

}
