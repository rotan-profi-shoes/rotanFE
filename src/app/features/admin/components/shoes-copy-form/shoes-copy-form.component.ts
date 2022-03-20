import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkuService } from '../../services/sku.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ShoesService } from '../../services/shoes.service';

@Component({
  selector: 'app-shoes-copy-form',
  templateUrl: './shoes-copy-form.component.html',
  styleUrls: ['./shoes-copy-form.component.scss']
})
export class ShoesCopyFormComponent implements OnInit {
  public copyShoesForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly shoeService: ShoesService,
    private readonly config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef,
    private readonly messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  public copy(): void {
    if (!this.copyShoesForm.valid) {

      return;
    }

    this.shoeService.copyShoes(this.config.data.shoeId, this.copyShoesForm.value).subscribe((resp) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New copy was created successfully.' });
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
    this.copyShoesForm = this.formBuilder.group({
      sku: [null, Validators.required],
    });
  };
}
