import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ShoesService } from '../../services/shoes.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface Item {
  id: string,
  name: string
}

@Component({
  selector: 'app-shoes-form',
  templateUrl: './shoes-form.component.html',
  styleUrls: ['./shoes-form.component.scss']
})
export class ShoesFormComponent implements OnInit {
  public shoesForm: FormGroup;
  public genders: Item[];
  public forms: Item[];
  public shoesClass: Item[];
  public protectionClass: Item[];
  public colors: Item[];
  public sizes: String[];
  public modifications: Item[];
  public materials: Item[];
  public soles: Item[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly shoesService: ShoesService,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {
   }

  public ngOnInit(): void {
    this.initForm();
    this.getAllOptions();
  }

  public getAllOptions(): void {
    forkJoin([
      this.shoesService.getColorTypesList(),
      this.shoesService.getFormTypesList(),
      this.shoesService.getGenderTypesList(),
      this.shoesService.getSizesTypesList(),
      this.shoesService.getShoesClassTypesList(),
      this.shoesService.getProtectionTypesList(),
      this.shoesService.getSoleTypesList(),
      this.shoesService.getMaterialTypesList(),
      this.shoesService.getModificationTypesList(),
    ]).subscribe(([ colors, forms, genders, sizes, shoesClass, protectionClass, soles, materials, modification ]) => {
      this.colors = colors;
      this.forms = forms;
      this.genders = genders;
      this.sizes = sizes;
      this.shoesClass = shoesClass;
      this.protectionClass = protectionClass;
      this.soles = soles;
      this.materials = materials;
      this.modifications = modification;
    });
  }

  public submit(): void {
     this.shoesService.addShoes(this.shoesForm.value).subscribe((resp) => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Shoes added with success!'});
      this.router.navigate(['admin']);
     },
     (mainError) => {
       this.messageService.add({severity:'error', summary:'Error', detail: mainError.error});
     })
  }

  private initForm(): void {
    this.shoesForm = this.formBuilder.group({
        sku: [null],
        name: [null],
        gender: [null],
        form: [null],
        shoesClass: [null],
        protectionClass: [null],
        color: [null],
        size: [null],
        price: [null],
        modification: [null],
        material: [null],
        sole: [null],
        img1: [null],
        img2: [null],
    });
  }
}
