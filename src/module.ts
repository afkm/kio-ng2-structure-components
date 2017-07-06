import { CommonModule } from '@angular/common'
import { NgModule, ModuleWithProviders, Provider } from '@angular/core'

import { KioAbstractComponent } from './components/kio-abstract/kio-abstract.component'
import { KioAbstractContentComponent } from './components/kio-abstract-content/kio-abstract-content.component'
import { KioAbstractFragmentComponent } from './components/kio-abstract-fragment/kio-abstract-fragment.component'
import { KioAbstractRouterComponent } from './components/kio-abstract-router/kio-abstract-router.component'
import { KioAbstractSrcComponent } from './components/kio-abstract-src/kio-abstract-src.component'
import { KioAbstractTxtComponent } from './components/kio-abstract-txt/kio-abstract-txt.component'
import { KioComponentBuilderComponent } from './components/kio-component-builder/kio-component-builder.component'
import { KioContentLinkComponent } from './components/kio-content-link/kio-content-link.component'
import { KioContentRouterComponent } from './components/kio-content-router/kio-content-router.component'
import { KioEmbedComponent } from './components/kio-embed/kio-embed.component'
import { KioImageComponent } from './components/kio-image/kio-image.component'
import { KioListComponent } from './components/kio-list/kio-list.component'
import { KioPublicationComponent } from './components/kio-publication/kio-publication.component'
import { KioPublicationRouterComponent } from './components/kio-publication-router/kio-publication-router.component'
import { KioRouterComponent } from './components/kio-router/kio-router.component'
import { KioSidebarComponent } from './components/kio-sidebar/kio-sidebar.component'
import { KioStaticContentComponent } from './components/kio-static-content/kio-static-content.component'

const StructureComponents = [
  KioAbstractComponent,
  KioAbstractContentComponent,
  KioAbstractFragmentComponent,
  KioAbstractRouterComponent,
  KioAbstractSrcComponent,
  KioAbstractTxtComponent,
  KioComponentBuilderComponent,
  KioContentLinkComponent,
  KioContentRouterComponent,
  KioEmbedComponent,
  KioImageComponent,
  KioListComponent,
  KioPublicationComponent,
  KioPublicationRouterComponent,
  KioRouterComponent,
  KioSidebarComponent,
  KioStaticContentComponent
]

@NgModule({
  imports: [CommonModule],
  //declarations: [],
  //providers: [ ],
  entryComponents: [StructureComponents],
  exports: [CommonModule]
})
export class KioStructureModule {

  public static forRoot ():ModuleWithProviders {
    return {
      ngModule: KioStructureModule,
      providers: []
    }
  }
}
