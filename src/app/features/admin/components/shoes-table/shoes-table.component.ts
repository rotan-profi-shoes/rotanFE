import { Component, OnInit } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { SizesService } from '../../services/sizes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shoes-table',
  templateUrl: './shoes-table.component.html',
  styleUrls: ['./shoes-table.component.scss'],
  providers: [ConfirmationService],
})
export class ShoesTableComponent implements OnInit {
  public shoes: any;

  constructor(
    private readonly router: Router,
    public shoesService: ShoesService,
    public sizeService: SizesService,
    private confirmationService: ConfirmationService,
  ) { 
  }

  public ngOnInit(): void {
    this.fetchShoes();
  };


  public fetchShoes(): void {
    this.shoesService.getShoesList().subscribe((resp) => {
      this.shoes = resp;
    })
  }

  public deleteDialog(shoe: any): void {
    this.confirmationService.confirm({
        message: `Are you sure that you want remove ${shoe.sku}?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.shoesService.deleteShoesById(shoe._id).pipe(
            switchMap(() => {
              return this.sizeService.deleteSizesBySku(shoe._id)
            }),
          ).subscribe(() => this.fetchShoes());
        },
        reject: () => {;
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
  }
}
