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
  public zertifikats: Item[];
  public colors: Item[];
  public sizes: String[];
  public modifications: Item[];
  public materials: Item[];
  public soles: Item[];
  public upperLeathers: Item[];
  public descriptions: Item[];
  public capDescriptions: Item[];
  public soleDescriptions: Item[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly shoesService: ShoesService,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {
  }

  public get newSizes(): FormGroup {
    return this.shoesForm.controls.shoes_sizes as FormGroup;
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
      this.shoesService.getZertifikatTypesList(),
      this.shoesService.getSoleTypesList(),
      this.shoesService.getMaterialTypesList(),
      this.shoesService.getModificationTypesList(),
      this.shoesService.getUpperLeatherTypesList(),
      this.shoesService.getDescriptionTypesList(),
      this.shoesService.getCapDescriptionTypesList(),
      this.shoesService.getSoleDescriptionTypesList(),
    ]).subscribe(([ colors, forms, genders, sizes, shoesClass, zertifikats, soles, materials, modifications, upperLeathers, descriptions, capDescriptions, soleDescriptions ]) => {
      this.colors = colors;
      this.forms = forms;
      this.genders = genders;
      this.sizes = sizes;
      this.shoesClass = shoesClass;
      this.zertifikats = zertifikats;
      this.soles = soles;
      this.materials = materials;
      this.modifications = modifications;
      this.upperLeathers = upperLeathers;
      this.descriptions = descriptions;
      this.capDescriptions = capDescriptions;
      this.soleDescriptions = soleDescriptions;
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
        zertifikat: [null],
        color: [null],
        modification: [null],
        material: [null],
        sole: [null],
        upperLeather: [null],
        description: [null],
        capDescription: [null],
        soleDescription: [null],
        img1: [null],
        img2: [null],
        sizes: this.formBuilder.array([]),
        shoes_sizes: this.formBuilder.group({
          sizes: this.formBuilder.array([]),
        }),
        // sizes: this.formBuilder.array([]),
    });
  }
}
