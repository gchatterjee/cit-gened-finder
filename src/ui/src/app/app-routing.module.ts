import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PpcComponent }         from './ppc/ppc.component';
import { SdmComponent }         from './sdm/sdm.component';
import { WeComponent }          from './we/we.component';
import { IiComponent }          from './ii/ii.component';

const routes: Routes = [
  { path: '', redirectTo: '/ppc', pathMatch: 'full' },
  { path: '/ppc', component: PpcComponent },
  { path: '/sdm', component: SdmComponent },
  { path: '/we', component: WeComponent },
  { path: '/ii', component: IiComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
