import { Component, OnInit } from '@angular/core';
import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent  implements OnInit{

  ngOnInit():void{
   const resolvedProduct:ProductResolved=this.route.snapshot.data['resolvedProduct']
   this.errorMessage=resolvedProduct.error
   this.onProductRetrieved(resolvedProduct.product)
  }
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService,private route:ActivatedRoute) { }

  onProductRetrieved(product: Product): void {
    this.product = product;
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
