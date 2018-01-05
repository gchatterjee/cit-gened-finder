import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PpcComponent } from './ppc/ppc.component';
import { SdmComponent } from './sdm/sdm.component';
import { IiComponent } from './ii/ii.component';
import { WeComponent } from './we/we.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    PpcComponent,
    SdmComponent,
    IiComponent,
    WeComponent,
    ListingPageComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
