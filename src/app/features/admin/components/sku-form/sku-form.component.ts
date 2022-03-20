import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SkuService } from '../../services/sku.service';

@Component({
  selector: 'app-sku-form',
  templateUrl: './sku-form.component.html',
  styleUrls: ['./sku-form.component.scss'],
})
export class SkuFormComponent implements OnInit {
  public skuForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly skuService: SkuService,
    private readonly config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef,
    private readonly messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  public addSku(): void {
    if (!this.skuForm.valid) {

      return;
    }

    this.skuService.addSku(this.skuForm.value).subscribe((resp) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Parent SKU added with success.' });
      this.ref.close(resp);
    }, (mainError) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: mainError.error });
      this.ref.close();
    });
  }

  public close(): void {
    this.ref.close();
  }

  private initForm(): void {
    this.skuForm = this.formBuilder.group({
      parentSku: [null, Validators.required],
    });
  };
}


