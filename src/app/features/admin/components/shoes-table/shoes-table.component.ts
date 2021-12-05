import { Component, OnInit } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';

@Component({
  selector: 'app-shoes-table',
  templateUrl: './shoes-table.component.html',
  styleUrls: ['./shoes-table.component.scss'],
})
export class ShoesTableComponent implements OnInit {
  public shoes: any;

  constructor(
    public shoesService: ShoesService,
  ) { 
  }

  public ngOnInit(): void {
    this.shoesService.getShoesList().subscribe((resp) => {
      this.shoes = resp;
    })
  }
}
