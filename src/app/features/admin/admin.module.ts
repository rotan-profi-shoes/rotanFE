import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ButtonModule } from 'primeng/button';
import { AdminLayoutContainer } from './containers/admin-layout/admin-layout.container';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShoesFormComponent } from './components/shoes-form/shoes-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ShoesService } from './services/shoes.service';
import { InputTextModule } from 'primeng/inputtext';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ShoesTableComponent } from './components/shoes-table/shoes-table.component';
import { SizeManagerComponent } from './components/size-manager/size-manager.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SizesService } from './services/sizes.service';
import { ShoesInfoComponent } from './components/shoes-info/shoes-info.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SizeFormComponent } from './components/size-form/size-form.component';
import { SkuManagerComponent } from './components/sku-manager/sku-manager.component';
import { SkuFormComponent } from './components/sku-form/sku-form.component';
import { SkuService } from './services/sku.service';
import { ShoesCopyFormComponent } from './components/shoes-copy-form/shoes-copy-form.component';
import { FileUploadModule } from 'primeng/fileupload';
import { PhotoService } from './services/photo.service';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    AdminLayoutContainer,
    ShoesFormComponent,
    ShoesTableComponent,
    SizeManagerComponent,
    ShoesInfoComponent,
    SizeFormComponent,
    SkuManagerComponent,
    SkuFormComponent,
    ShoesCopyFormComponent,
    OrderListComponent,
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
    ImageModule,
    InputNumberModule,
    GalleriaModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    FileUploadModule,
  ],
  providers: [
    ShoesService,
    SizesService,
    SkuService,
    PhotoService,
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
})
export class AdminModule { }
