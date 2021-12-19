import { Component, OnInit } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-shoes-table',
  templateUrl: './shoes-table.component.html',
  styleUrls: ['./shoes-table.component.scss'],
  providers: [ConfirmationService],
})
export class ShoesTableComponent implements OnInit {
  public shoes: any;

  constructor(
    
    public shoesService: ShoesService,
    private confirmationService: ConfirmationService,
  ) { 
  }

  public ngOnInit(): void {
    this.shoesService.getShoesList().subscribe((resp) => {
      this.shoes = resp;
    })
  }

  public confirm(shoe: any): void {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('test');
        },
        reject: () => {;
          console.log('teewt');
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
}
}
