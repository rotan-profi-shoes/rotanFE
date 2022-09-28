import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoesService } from '../../services/shoes.service';

interface Item {
  id: string,
  name: string
}

@Component({
  selector: 'app-size-manager',
  templateUrl: './size-manager.component.html',
  styleUrls: ['./size-manager.component.scss']
})
export class SizeManagerComponent implements OnInit {
  @Input() public sizesManagementForm: FormGroup;

  public sizes: Item[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ShoesService,
  ) {
  }

  public get sizesRows(): FormArray {
    if (this.sizesManagementForm) {
      return this.sizesManagementForm.get('sizes') as FormArray;
    }

    return null;
  }

  public ngOnInit(): void {
    this.apiService.getSizesTypesList().subscribe(response => this.sizes = response);
  }

  public addNewSize(): void {
    if (this.sizesManagementForm.invalid) {

      return;
    }

    this.sizesRows.push(
      this.formBuilder.group({
        sizeValue: [null, Validators.required],
        quantity: [null, Validators.required],
        price: [null, Validators.required],
      }),
    );
  }

  public deleteSize(index: number): void {
    this.sizesRows.removeAt(index);
  }
}
