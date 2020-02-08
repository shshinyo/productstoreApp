import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})

export class ProductsResolver implements Resolve<Product[]>{
    constructor(private serv:ProductService){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<Product[]>{
    return this.serv.getProducts();
    }

}
///////////////////////////////////////////////////didnt worked//////////////////////////////////