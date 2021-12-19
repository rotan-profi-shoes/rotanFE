import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { ShoesService } from '../../services/shoes.service';
import { SizesService } from '../../services/sizes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shoes-info',
  templateUrl: './shoes-info.component.html',
  styleUrls: ['./shoes-info.component.scss']
})
export class ShoesInfoComponent implements OnInit, OnDestroy {
  public shoes: any;
  public sizes: any;
  public images: any[] = [];

  private subscription: Subscription = new Subscription();
  
  constructor(
    private readonly shoesService: ShoesService,
    private readonly sizesService: SizesService,
    private readonly route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.subscription.add(

      this.route.params.pipe(
       switchMap((params: any) => {
         return forkJoin([
           this.shoesService.getShoesBySku(params.id),
           this.sizesService.getSizesBySku(params.id),
         ])
       })
      ).subscribe(([shoes, sizes]) => {
        this.shoes = shoes;
        this.sizes = sizes;

        this.images.push({ src: this.shoes.img1 });
        this.images.push({ src: this.shoes.img2 });
      }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
