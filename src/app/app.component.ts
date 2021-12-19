import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast position="top-right"></p-toast>
    <p-confirmDialog [style]="{width: '50vw'}" key="positionDialog"></p-confirmDialog>
  `,
})
export class AppComponent {
}
