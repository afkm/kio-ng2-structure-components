import { Component, ElementRef, ViewChild } from '@angular/core';
import { KioAbstractContentComponent } from '../kio-abstract-content/kio-abstract-content.component'
import { KioOEmbedData, KioOEmbed, KioContentModel } from 'kio-ng2'

@Component({
  selector: 'kio-embed',
  templateUrl: './kio-embed.component.html',
  styleUrls: ['./kio-embed.component.scss']
})
export class KioEmbedComponent extends KioAbstractContentComponent {

  onUpdate(){
    super.onUpdate()
    this.updateEmbedData ( this.data.oEmbed ) 

    if (this.node && this.node.modifiers) {
      this.fitToBox = this.node.modifiers.indexOf('fit-to-box') !== -1
    }    
  }

  updateEmbedData(embed?:KioOEmbed){
    if ( embed )
    {
      this.updateIFrame(embed.data)
    }
  }

  getRatio ():number { 
    if ( this.node.headers ) 
    { 
      return this.node.headers.ratio || 1 
    } 
    return 1 
  }

  /**
   * reference to container element in template
   * @param {ElementRef} 'container' container element
   */
  @ViewChild('container') container:ElementRef
  @ViewChild('iframe') iframe:ElementRef

  getContainerBounds(){
    return this.container.nativeElement.getBoundingClientRect() 
  }

  protected updateIFrame ( embedData : KioOEmbedData ) {
    const iframe:HTMLIFrameElement = this.iframe.nativeElement
    for ( let key in embedData.attributes )
    {
      iframe.setAttribute ( key , embedData.attributes[key] )
    }
    this.resizeContent()
  }

  resizeContent () {
    const bounds = this.container.nativeElement.getBoundingClientRect()
    this.iframe.nativeElement.setAttribute ( 'width' , bounds.width + 'px' )
    this.iframe.nativeElement.setAttribute ( 'height' , (bounds.width / this.getRatio()) + 'px' )
  }

  protected onResize () {
    this.resizeContent()
  }

  fitToBox:boolean = false

}
