import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingPageComponent } from './listing-page/listing-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'ppc', pathMatch: 'full' },
  { path: 'ppc', component: ListingPageComponent, data: { category: 'ppc' }},
  { path: 'sdm', component: ListingPageComponent, data: { category: 'sdm' } },
  { path: 'we', component: ListingPageComponent, data: { category: 'we' } },
  { path: 'ii', component: ListingPageComponent, data: { category: 'ii' } }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
