import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoesService } from '../../services/shoes.service';
import { SizesService } from '../../services/sizes.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss']
})
export class SizeFormComponent implements OnInit {
  public sizeForm: FormGroup;
  public sizes: String[];
  public isEditMode: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sizesService: SizesService,
    private readonly shoesService: ShoesService,
    private readonly config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef,
    private readonly messageService: MessageService,
  ) {
    if (this.config.data.size) { this.isEditMode = true } else { this.isEditMode = false }
  }

  ngOnInit(): void {
    this.shoesService.getSizesTypesList().subscribe(resp => this.sizes = resp);

    if (this.config.data.size) {
      this.sizesService.getSize(this.config.data.size._id).subscribe(resp => this.sizeForm.patchValue(resp));
    }

    this.initForm();
  }

  public addSize(): void {
    if (!this.sizeForm.valid) {
      
      return;
    }

    const newSize = this.sizeForm.value;
    newSize.shoesId = this.config.data.shoesId;

    if (!this.isEditMode) {
      this.sizesService.addSize(newSize).subscribe((resp) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'New size added with success.'});
        this.ref.close(resp);
      }, (mainError) => {
        this.messageService.add({severity:'error', summary:'Error', detail: mainError.error});
        this.ref.close();
      });
    } else {
      this.sizesService.updateSize( this.config.data.size._id, newSize).subscribe((resp) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Size updated with success.'});
        this.ref.close(resp);
      }, (mainError) => {
        this.messageService.add({severity:'error', summary:'Error', detail: mainError.error});
        this.ref.close();
      });
    }
  }

  private initForm(): void {
    this.sizeForm = this.formBuilder.group({
      sizeValue: [null, Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required],
    });
  };
}

