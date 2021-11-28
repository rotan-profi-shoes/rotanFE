import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetToken, SetUser } from 'src/app/store/general.actions';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.container.html',
  styleUrls: ['./admin-layout.container.scss']
})
export class AdminLayoutContainer implements OnInit {

  constructor(
    public readonly store: Store,
    public readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.store.dispatch(new SetUser(null));
    this.store.dispatch(new SetToken(null));

    this.router.navigate(['auth/login']);
  }
}
