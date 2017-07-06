import { Component, OnInit } from '@angular/core';
import { KioAbstractComponent } from '../kio-abstract/kio-abstract.component'
import { KioNodeModel, KioContentModel } from 'kio-ng2'
import { matchComponent } from 'kio-ng2-component-routing'
//import { matchComponent } from '../../query/Query'

@Component({
  selector: 'kio-abstract-router',
  templateUrl: './kio-abstract-router.component.html',
  styleUrls: ['./kio-abstract-router.component.css']
})
export class KioAbstractRouterComponent<T extends KioContentModel> extends KioAbstractComponent<T> {

  protected get childComponents() : any[] {
    return []
  }

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

  protected matchChildComponent ( ChildComponent ) : boolean {
    return matchComponent(ChildComponent.queryAnnotation)(<any>this.node)
  }

  protected getRoutedIndex ( ): number {
    return this.childComponents.findIndex ( ( ChildComponent ) => this.matchChildComponent ( ChildComponent ) )
  }

  protected onNodeUpdate ( ) {
    super.onNodeUpdate()
    this.routedIndex = this.getRoutedIndex()
  }

}
