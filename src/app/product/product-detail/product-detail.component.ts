import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IProduct } from '../../product';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: IProduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(typeof(this.activatedRoute.snapshot.params.id));
    // const product = this.activatedRoute.snapshot.params.id;
    // this.productService.findProductById(product).subscribe((result) => {
    //   this.product = result;
    // })
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id: any) => this.productService.findProductById(id))
    ).subscribe(product => this.product = product);
  }

  backToList() {
    this.router.navigate(['/product'])
  }
}
