import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutContainer } from './containers/admin-layout/admin-layout.container';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutContainer,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
