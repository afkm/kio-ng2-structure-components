import { Component, Input } from '@angular/core';
import { KioNode } from 'kio-ng2'

import { Router } from '@angular/router'

@Component({
  selector: 'kio-content-link',
  templateUrl: './kio-content-link.component.html',
  styleUrls: ['./kio-content-link.component.css']
})
export class KioContentLinkComponent {

  constructor( private router : Router ) {}

  @Input() node:KioNode;


  handleClick ( ev ) {

    const link = this.node.modifiers.find ( mod => /^link\-\-/.test ( mod ) )
    if ( link )
    {
      const urlPart = link.replace ( /^link\-\-/ , '' )
      const url = this.router.url.toString()
      this.router.navigateByUrl ( url + '/' + urlPart )
    }
  }
}
