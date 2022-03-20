import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoesFormComponent } from './components/shoes-form/shoes-form.component';
import { ShoesInfoComponent } from './components/shoes-info/shoes-info.component';
import { ShoesTableComponent } from './components/shoes-table/shoes-table.component';
import { AdminLayoutContainer } from './containers/admin-layout/admin-layout.container';
import { SkuManagerComponent } from './components/sku-manager/sku-manager.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutContainer,
    children: [
      {
        path: '',
        component: ShoesTableComponent,
      },
      {
        path: 'add-shoes',
        component: ShoesFormComponent,
      },
      {
        path: 'view/:id',
        component: ShoesInfoComponent,
      },
      {
        path: 'edit/:id',
        component: ShoesFormComponent,
      },
      {
        path: 'sku',
        component: SkuManagerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
