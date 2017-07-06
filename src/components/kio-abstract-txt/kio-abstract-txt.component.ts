import { Component, ViewChild, AfterContentInit, TemplateRef, Input, OnInit } from '@angular/core'
import { KioAbstractContentComponent } from '../kio-abstract-content/kio-abstract-content.component'
import { KioContentModel } from 'kio-ng2'

@Component({
  template: ''
})
export class KioAbstractTxtComponent extends KioAbstractContentComponent {

  text:string;

  get hasData() : boolean {
    return this.data && Object.keys(this.data).length > 0
  }

  protected onBeforeLoad() {
    this.text = null
    super.onBeforeLoad()
  }

  protected onUpdate() {
    if ( this.data )
    {
      this.text = this.data.text
      process.nextTick(()=>{
        this.updateContentState()
      })
    }
    else
    {
      this.text = null
    }
  }

  updateContentState() {
    super.updateContentState()
  }

}
