import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ShoesService } from '../../services/shoes.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SizesService } from '../../services/sizes.service';

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
    private readonly sizesService: SizesService,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {
  }

  public get newSizes(): FormGroup {
    return this.shoesForm.controls.shoesSizes as FormGroup;
  }

  public ngOnInit(): void {
    this.initForm();
    this.getAllOptions();
  }

  public getAllOptions(): void {

    this.shoesService.getMaterialTypesList().subscribe(resp => console.log(resp));

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
    if (!this.shoesForm.valid) {
      this.messageService.add({severity:'error', summary:'Error', detail: 'All fields are required.'});

      return;
    }

    if (this.shoesForm.controls.shoesSizes.get('sizes').value.length === 0) {
      this.messageService.add({severity:'error', summary:'Error', detail: 'Add at least one size.'});

      return;
    }

    this.shoesService.addShoes(this.shoesForm.value).pipe(
      switchMap((resp) => {
        const prepareSizes = this.shoesForm.controls.shoesSizes.get('sizes').value;

        prepareSizes.forEach(element => {
          element.shoesId = resp._id;
        });

        return this.sizesService.addSizes(prepareSizes)
      })).subscribe((sizesResponse) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Shoes added with success.'});
        this.router.navigate(['admin']);
      },
      (mainError) => {
        this.messageService.add({severity:'error', summary:'Error', detail: mainError.error});
      });
  }

  private initForm(): void {
    this.shoesForm = this.formBuilder.group({
        sku: [null, Validators.required],
        name: [null, Validators.required],
        gender: [null, Validators.required],
        form: [null, Validators.required],
        shoesClass: [null, Validators.required],
        zertifikat: [null, Validators.required],
        color: [null, Validators.required],
        modification: [null, Validators.required],
        material: [null, Validators.required],
        sole: [null, Validators.required],
        upperLeather: [null, Validators.required],
        description: [null, Validators.required],
        capDescription: [null, Validators.required],
        soleDescription: [null, Validators.required],
        img1: [null, Validators.required],
        img2: [null, Validators.required],
        shoesSizes: this.formBuilder.group({
          sizes: this.formBuilder.array([]),
        }),
    });
  }
}
