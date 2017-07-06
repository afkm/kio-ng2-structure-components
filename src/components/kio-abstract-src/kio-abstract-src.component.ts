import { Component, Input, OnInit } from '@angular/core'
import { Observable, Scheduler, Subscription } from 'rxjs'
import { KioContentModel, KioFragmentModel, KioContentState, KioContent } from 'kio-ng2'

import { KioBackendService } from '../../services/kio-backend.service'
import { KioAbstractContentComponent } from '../kio-abstract-content/kio-abstract-content.component'

@Component({
  template: ''
})
export class KioAbstractSrcComponent extends KioAbstractContentComponent {

  @Input() srcParams:any={};

  getContentParams():any{
    return this.srcParams
  }

  url:string;
  mediaType:string;    // from mimeType 
  contentType:string;  // from mimeType 

  resizing=this.windowEventService.resize

  getRatio ():number { 
    if ( this.node && this.node.headers ) 
    { 
      return this.node.headers.ratio || 1 
    } 
    return 1 
  }

  protected onNodeUpdate ( ) {
    const [ mediaType, contentType ] = ((this._node.headers||{})["mimeType"]||'').split('/')
    this.mediaType = mediaType
    this.contentType = contentType
    super.onNodeUpdate()
  }

  protected onUpdate() {
    super.onUpdate()
    this.url = this.data.url
  }

  protected onResize() {
    //
  }

  private resizeSubscription:Subscription

  protected subscribeResizing () {
    this.resizeSubscription = this.resizing.subscribe(e => {
      this.onResize()
    });
  }

  protected unsubscribeResizing () {
    if ( this.resizeSubscription )
    {
      this.resizeSubscription.unsubscribe()
      this.resizeSubscription = null
    }
  }

  ngOnDestroy(){
    super.ngOnDestroy()
    this.unsubscribeResizing()
  }

  ngOnInit () {
    super.ngOnInit()
    this.subscribeResizing()
  }

}
