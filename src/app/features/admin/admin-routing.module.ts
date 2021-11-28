import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoesFormComponent } from './components/shoes-form/shoes-form.component';
import { AdminLayoutContainer } from './containers/admin-layout/admin-layout.container';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutContainer,
    children: [
      {
        path: 'add-shoes',
        component: ShoesFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
