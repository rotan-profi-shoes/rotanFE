import { Component, OnInit } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { ConfirmationService } from 'primeng/api';
import { SizesService } from '../../services/sizes.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ShoesCopyFormComponent } from '../shoes-copy-form/shoes-copy-form.component';

@Component({
  selector: 'app-shoes-table',
  templateUrl: './shoes-table.component.html',
  styleUrls: ['./shoes-table.component.scss'],
  providers: [ConfirmationService, DialogService],
})
export class ShoesTableComponent implements OnInit {
  public shoes: any;
  public groupedShoes: any;
  public isSearchEmpty: boolean = true;
  public generalSearch: FormControl;

  constructor(
    public shoesService: ShoesService,
    public sizeService: SizesService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.buildSearch();
    this.fetchShoes();
  };

  public clearSearch(): void {
    this.generalSearch.setValue('');
  }

  public fetchShoes(): void {
    this.shoesService.getGroupedShoesByParentSku().subscribe((resp) => {
      this.groupedShoes = resp;
    });
  }

  public buildSearch(): void {
    this.generalSearch = this.formBuilder.control('');
  }

  public deleteDialog(shoe: any): void {
    this.confirmationService.confirm({
        message: `Are you sure you want to remove ${shoe.sku}?`,
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

  public copyDialog(shoe: any): void {
    const ref = this.dialogService.open(ShoesCopyFormComponent, {
      header: `Do you want to create a copy of ${shoe.sku}?`,
      width: '70%',
      data: {
        shoeId: shoe._id,
      }
    });

    ref.onClose.subscribe(() => {
      this.fetchShoes();
    });
  }
}
