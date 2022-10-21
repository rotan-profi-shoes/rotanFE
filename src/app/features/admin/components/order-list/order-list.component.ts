import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [ConfirmationService, DialogService],
})
export class OrderListComponent implements OnInit {
  public orders$: Observable<any[]>;
  public generalSearch: FormControl;

  constructor(
    public orderHttpService: OrderService,
    private formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.generalSearch = this.formBuilder.control('');

    this.orders$ = this.orderHttpService.getOrderList();
  }

  public clearSearch(): void {
    this.generalSearch.setValue('');
  }
}
