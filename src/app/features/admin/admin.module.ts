import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ButtonModule } from 'primeng/button';
import { AdminLayoutContainer } from './containers/admin-layout/admin-layout.container';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AdminLayoutContainer,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ButtonModule,
    FontAwesomeModule,
  ]
})
export class AdminModule { }
