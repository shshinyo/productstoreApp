import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

 /* ngOnInit(){//////without observables 
   const resolvedProduct :ProductResolved=this.route.snapshot.data['resolvedProduct']
    this.errorMessage=resolvedProduct.error
    this.onProductRetrieved(resolvedProduct.product)
  }*/

  ngOnInit(){
    this.route.data.subscribe(data=>{
      const resolvedProduct:ProductResolved=data['resolvedProduct']
      this.onProductRetrieved(resolvedProduct.product)
    })}
  pageTitle = 'Product Edit';
  errorMessage: string;
  dataIsVaild:{[key:string]:boolean}={}
  get isDirty():boolean{
  return JSON.stringify(this.originalProduct)!==JSON.stringify(this.currentProduct)
  }

  private  currentProduct: Product;
  private originalProduct:Product;
  public get product(): Product {
    return this.currentProduct;
  }
  public set product(value: Product) {
    this.currentProduct = value;
    this.originalProduct={...value}
  }

  constructor(private productService: ProductService,
              private messageService: MessageService ,private route :ActivatedRoute ,private router :Router) { }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }
  isValid(path?:string):boolean{
    this.validate();
    if(path){
      return this.dataIsVaild[path]
    } 
      return (this.dataIsVaild && Object.keys(this.dataIsVaild).every(d=>this.dataIsVaild[d]===true))
  }
  resest(){
    this.dataIsVaild=null;
    this.currentProduct=null;
    this.originalProduct=null;
  }

  saveProduct(): void {
    if (this.isValid()) {
     
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.router.navigate(['/products'])
    this.resest();
    // Navigate back to the product list
  }
  validate(){
    this.dataIsVaild={}
    /////////info
    if(this.product.productName&&this.product.productName.length>3&&this.product.productCode){
      this.dataIsVaild['info']=true;
    }else{
      this.dataIsVaild['info']=false;
    }
    /////////tages
    if(this.product.category&&this.product.category.length>3){
      this.dataIsVaild['tages']=true;
    }else{
      this.dataIsVaild['tages']=false;
    }
  }
}
