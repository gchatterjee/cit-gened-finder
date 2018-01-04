import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PpcComponent } from './ppc/ppc.component';
import { SdmComponent } from './sdm/sdm.component';
import { IiComponent } from './ii/ii.component';
import { WeComponent } from './we/we.component';


@NgModule({
  declarations: [
    AppComponent,
    PpcComponent,
    SdmComponent,
    IiComponent,
    WeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
