import { Component, ViewChild, ElementRef, OnInit, Input, AfterViewInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { KioPublication, KioNode } from 'kio-ng2'

@Component({
  selector: 'kio-publication',
  templateUrl: './kio-publication.component.html',
  styleUrls: ['./kio-publication.component.css']
})
export class KioPublicationComponent implements OnInit {

  constructor ( 
    private route: ActivatedRoute, 
    private router : Router 
  ){}


  @Input() publication:KioPublication;

  ngOnInit() {
    // subscribing to data service
    // publication data is passed through components from here on
    if ( this.publication )
    {
      this.isMounted = true
    }
  }

  isMounted : boolean = false

  private show () {
    this.isMounted = true
  }

  private hide () {
    this.isMounted = false
  }
}
