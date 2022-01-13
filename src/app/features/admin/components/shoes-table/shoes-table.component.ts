import { Component, OnInit } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { ConfirmationService } from 'primeng/api';
import { SizesService } from '../../services/sizes.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shoes-table',
  templateUrl: './shoes-table.component.html',
  styleUrls: ['./shoes-table.component.scss'],
  providers: [ConfirmationService],
})
export class ShoesTableComponent implements OnInit {
  public shoes: any;
  public shoesTableData: any;
  public isSearchEmpty: boolean = true;
  public generalSearch: FormControl;

  constructor(
    // private readonly router: Router,
    public shoesService: ShoesService,
    public sizeService: SizesService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { 
  }

  public ngOnInit(): void {
    this.buildSearch();
    this.fetchShoes();

    this.generalSearch.valueChanges.subscribe((value) => {
      value = value.toUpperCase();
      if (value === '') { this.isSearchEmpty = true } else { this.isSearchEmpty = false };
      this.shoesTableData = this.shoes.filter((item) => item.sku.includes(value));
      console.log(this.shoesTableData);
    });
  };

  public clearSearch(): void {
    this.generalSearch.setValue('');
  }

  public fetchShoes(): void {
    this.shoesService.getShoesList().subscribe((resp) => {
      this.shoes = resp;
    })
  }

  public buildSearch(): void {
    this.generalSearch = this.formBuilder.control('');
  }

  public deleteDialog(shoe: any): void {
    this.confirmationService.confirm({
        message: `Sind Sie sicher, dass Sie entfernen möchten ${shoe.sku}?`,
        header: 'Bestätigung',
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
