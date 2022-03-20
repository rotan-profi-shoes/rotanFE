import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SkuFormComponent } from '../sku-form/sku-form.component';
import { SkuService } from '../../services/sku.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sku-manager',
  templateUrl: './sku-manager.component.html',
  styleUrls: ['./sku-manager.component.scss'],
  providers: [ConfirmationService, DialogService],

})
export class SkuManagerComponent implements OnInit {
  public skus: any;
  public skuTableData: any;
  public isSearchEmpty: boolean = true;
  public generalSearch: FormControl;

  constructor(
    private skuService: SkuService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.buildSearch();
    this.fetchSkus();

    this.generalSearch.valueChanges.subscribe((value) => {
      value = value.toUpperCase();

      if (value === '') {
        this.isSearchEmpty = true;
      } else {
        this.isSearchEmpty = false;
      }

      this.skuTableData = this.skus.filter((item) => item.parentSku.includes(value));
    });
  };

  public clearSearch(): void {
    this.generalSearch.setValue('');
  }

  public fetchSkus(): void {
    this.skuService.getSkuList().subscribe((resp) => {
      this.skus = resp;
    });
  }

  public openAddSkuDialog(): void {
    const ref = this.dialogService.open(SkuFormComponent, {
      header: 'Add new Parent SKU',
      width: '70%',
    });

    ref.onClose.subscribe(() => {
      this.skuService.getSkuList().subscribe((skus) => {
        this.skus = skus;
      })
    });
  }

  public buildSearch(): void {
    this.generalSearch = this.formBuilder.control('');
  }

  public deleteDialog(sku: any): void {
    this.confirmationService.confirm({
      message: `Are you sure, do you want to delete this Parent sku ${sku.parentSku}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.skuService.deleteSkuById(sku._id).pipe().subscribe(() => this.fetchSkus());
      },
      reject: () => {;
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }
}
