import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { KioStructureModule } from '../../../src/module'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    KioStructureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
