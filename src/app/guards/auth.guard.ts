import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GeneralSelectors } from '../store/general.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {}
  canActivate(): Observable<boolean> |  boolean {
    if (this.store.selectSnapshot(GeneralSelectors.getToken))
    { 
      return true; 
    }
    
    this.router.navigate(['auth/login']);
    return false;
  }
  
}
