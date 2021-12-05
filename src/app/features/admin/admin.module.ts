import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ButtonModule } from 'primeng/button';
import { AdminLayoutContainer } from './containers/admin-layout/admin-layout.container';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoesFormComponent } from './components/shoes-form/shoes-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ShoesService } from './services/shoes.service';
import { InputTextModule } from 'primeng/inputtext';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ShoesTableComponent } from './components/shoes-table/shoes-table.component';

@NgModule({
  declarations: [
    AdminLayoutContainer,
    ShoesFormComponent,
    ShoesTableComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ButtonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
    HttpClientModule,
    DropdownModule,
    TableModule,
  ],
  providers: [
    ShoesService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    },
  ],
})
export class AdminModule { }
