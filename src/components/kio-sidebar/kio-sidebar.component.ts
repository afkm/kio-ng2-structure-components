import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router , Routes, Route, ActivatedRouteSnapshot, Params, NavigationError, RoutesRecognized, NavigationStart } from '@angular/router'
import { KioSitemapService, KioSitemapLoaderService } from '../../navigation/sitemap'
import { Locale } from '../../../i18n'

@Component({
  selector: 'kio-sidebar',
  templateUrl: './kio-sidebar.component.html',
  styleUrls: ['./kio-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KioSidebarComponent implements OnInit {

  constructor(private router:Router, private sitemapLoader:KioSitemapLoaderService<Locale> ) {}

  isOpen:boolean=false;

  anchorSubscription=this.sitemapLoader.sitemapAnchorNavigation.subscribe ( slug => {
    this.isOpen = false
  } )

  toggleSidebarState(event){
    this.isOpen = !this.isOpen
  }

  ngOnInit(){
    this.router.events.subscribe(event=>{
      if ( event instanceof RoutesRecognized )
      {
        this.isOpen = false
      }
    })

  }
}
