import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginContainer } from './containers/login/login.container';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    LoginContainer,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    HttpClientModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
