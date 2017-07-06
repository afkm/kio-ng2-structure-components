import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { KioAbstractComponent } from '../kio-abstract/kio-abstract.component'
import { KioContentModel } from 'kio-ng2'


const modsEqual = ( mods:Array<string> , others:Array<string> ) => {
  if ( mods.length !== others.length )
    return false
  // can't find non-matching mod in others
  return !mods.find ( ( mod ) => others.indexOf ( mod ) === -1 )
}

@Component({
  selector: 'old-kio-router',
  templateUrl: './kio-router.component.html',
  styleUrls: ['./kio-router.component.css']
})
export class KioRouterComponent extends KioAbstractComponent<KioContentModel> {

  protected get childComponents() : any[] {
    return []
  }

  routedIndex:number=-1

  protected getRoutedIndex ( ): number {
    return this.childComponents.findIndex ( ( ChildComponent ) => modsEqual ( ChildComponent.RequiredMods , this.node.modifiers ) )
  }

  protected onNodeUpdate ( ) {
    this.routedIndex = this.getRoutedIndex()
  }
}
