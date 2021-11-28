import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetToken, SetUser } from 'src/app/store/general.actions';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup; 

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly apiAuthService: AuthService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public tryLogin(): void {
    if (!this.checkValidity()) {
      this.markAsTouched(this.loginForm);

      return;
    }

    this.apiAuthService.authentificate(this.loginForm.value).subscribe((resp) => {
      this.store.dispatch(new SetUser(resp.user));
      this.store.dispatch(new SetToken(resp.userToken));

      this.messageService.add({severity:'success', summary:'Success', detail:'Your credentials are valid.'});
      this.router.navigate(['admin']);
    },
    (mainError) => {
      this.messageService.add({severity:'error', summary:'Error', detail: mainError.error});
    })
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  get email() {return this.loginForm.get('email')}
  get password() {return this.loginForm.get('password')}

  private checkValidity(): boolean {
    if (this.loginForm.invalid) {
      this.markAsTouched(this.loginForm)
    }

    return this.loginForm.valid;
  }

  private markAsTouched(form): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    })
  }

}
