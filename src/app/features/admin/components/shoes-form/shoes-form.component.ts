import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { ShoesService } from '../../services/shoes.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SizesService } from '../../services/sizes.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SizeFormComponent } from '../size-form/size-form.component';
import { SkuService } from '../../services/sku.service';
import { PhotoService } from '../../services/photo.service';

interface Item {
  id: string,
  name: string,
}

@Component({
  selector: 'app-shoes-form',
  templateUrl: './shoes-form.component.html',
  styleUrls: ['./shoes-form.component.scss'],
  providers: [ConfirmationService, DialogService],
})
export class ShoesFormComponent implements OnInit, OnDestroy {
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
  public parentSku: any[];
  public isEditMode: boolean = false;
  public sizesTable: any;
  public shoesId: string;
  public submitButtonLabel: string = 'SCHUHE HINZUFÜGEN';
  public currentShoes: any;
  public file: any;

  private subscription: Subscription = new Subscription();

  constructor(
    private confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
    private readonly formBuilder: FormBuilder,
    private readonly shoesService: ShoesService,
    private readonly sizesService: SizesService,
    private readonly photosService: PhotoService,
    private readonly skuService: SkuService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    if (this.router.url.includes('edit')) {
      this.isEditMode = true;
      this.submitButtonLabel = 'SCHUHE BEARBEITEN';
    }
  }

  public get newSizes(): FormGroup {
    return this.shoesForm.controls.shoesSizes as FormGroup;
  }

  public ngOnInit(): void {
    this.initForm();
    this.getAllOptions();

    if (this.isEditMode) {
      this.subscription.add(
        this.route.params.pipe(
          switchMap((params: any) => {
            this.shoesId = params.id;

            return forkJoin([
              this.shoesService.getShoesById(params.id),
              this.sizesService.getSizesById(params.id),
            ]);
          }),
        ).subscribe(([shoes, sizes]) => {
          this.currentShoes = shoes;

          const shoesForPatch = {
            ...shoes,
            parentSku: shoes?.parentSku?.parentSku,
            gender: shoes.gender.id,
            color: shoes.color.id,
            form: shoes.form.id,
            shoesClass: shoes.shoesClass.id,
            zertifikat: shoes.zertifikat.id,
            sole: shoes.sole.id,
            material: shoes.material.id,
            modification: shoes.modification.id,
            upperLeather: shoes.upperLeather.id,
            description: shoes.description.id,
            capDescription: shoes.capDescription.id,
            soleDescription: shoes.soleDescription.id,
          };

          this.sizesTable = sizes;

          this.shoesForm.patchValue(shoesForPatch);
        }));
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.skuService.getSkuList(),
    ]).subscribe(([colors, forms, genders, sizes, shoesClass, zertifikats, soles, materials, modifications, upperLeathers, descriptions, capDescriptions, soleDescriptions, skuList]) => {
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
      this.parentSku = skuList;
    });
  }

  public openSizeDialog(size?: any): void {
    const ref = this.dialogService.open(SizeFormComponent, {
      header: !size ? 'Neue Größe hinzufügen' : `Größe bearbeiten ${size.sizeValue}`,
      width: '70%',
      data: {
        size: size || null,
        shoesId: this.shoesId,
      },
    });

    ref.onClose.subscribe(() => {
      this.sizesService.getSizesById(this.shoesId).subscribe((sizes) => {
        this.sizesTable = sizes;
      });
    });
  }

  public deleteDialog(size: any): void {
    this.confirmationService.confirm({
      message: `Sind Sie sicher, dass Sie die Größe entfernen möchten ${size.sizeValue}?`,
      header: 'Bestätigung',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sizesService.deleteSizesById(size._id).subscribe(() => {
          this.sizesService.getSizesById(this.shoesId).subscribe((sizes) => {
            this.sizesTable = sizes;
          });
        });
      },
      reject: () => {
        ;
        // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }

  public onSelectPhotos(event: any) {
    this.file = event.currentFiles[0];
    this.photosService.getUrl().subscribe(response => {
      this.photosService.uploadFileToS3(response.url, this.file).subscribe(() => {
        const photos = this.shoesForm.controls.photos as FormGroup;
        photos.setValue([response.url.split('?')[0]]);
        // photos.push()
      });
    });
  }

  public submit(): void {
    if (!this.shoesForm.valid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'All fields are required.' });

      return;
    }

    if (!this.isEditMode && this.shoesForm.controls.shoesSizes.get('sizes').value.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Add at least one size.' });

      return;
    }

    if (!this.isEditMode) {
      this.shoesService.addShoes(this.shoesForm.value).pipe(
        switchMap((resp) => {
          const prepareSizes = this.shoesForm.controls.shoesSizes.get('sizes').value;

          prepareSizes.forEach(element => {
            element.shoesId = resp._id;
          });

          return this.sizesService.addSizes(prepareSizes);
        }),
      ).subscribe((sizesResponse) => {
          this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'Schuhe mit Erfolg hinzugefügt.' });
          this.router.navigate(['admin']);
        },
        (mainError) => {
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: mainError.error });
        });
    } else {
      this.shoesService.editShoes(this.currentShoes._id, this.shoesForm.value).subscribe((updatedShoes: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Erfolg',
          detail: 'Schuhe wurde mit Erfolg aktualisiert.',
        });

        const shoesForPatch = {
          ...updatedShoes,
          parentSku: updatedShoes.parentSku.parentSku,
          gender: updatedShoes.gender?.id,
          color: updatedShoes.color?.id,
          form: updatedShoes.form?.id,
          shoesClass: updatedShoes.shoesClass?.id,
          zertifikat: updatedShoes.zertifikat?.id,
          sole: updatedShoes.sole?.id,
          material: updatedShoes.material?.id,
          modification: updatedShoes.modification?.id,
          upperLeather: updatedShoes.upperLeather?.id,
          description: updatedShoes.description?.id,
          capDescription: updatedShoes.capDescription?.id,
          soleDescription: updatedShoes.soleDescription?.id,
        };

        this.shoesForm.patchValue(shoesForPatch);

      }),
        (mainError) => {
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: mainError.error });
        };
    }
  }

  private initForm(): void {
    this.shoesForm = this.formBuilder.group({
      sku: [{ value: null, disabled: this.isEditMode }, Validators.required],
      parentSku: [null, Validators.required],
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
      photos: [[], Validators.required],
      shoesSizes: this.formBuilder.group({
        sizes: this.formBuilder.array([]),
      }),
    });
  }
}
