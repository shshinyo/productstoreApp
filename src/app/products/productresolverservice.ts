import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductResolved } from './product';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class ProductResolver implements Resolve<ProductResolved>{
    constructor(private serv:ProductService){}
    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved>{
        const id=route.paramMap.get('id')
        if(isNaN(+id)){
            const message=`ID is not a number :${id}`
            console.log(message)
             return of({product:null,error:message})
        }
        return this.serv.getProduct(+id).pipe(
        map(product=>({product:product})),
        catchError(error=> {
            const message =`retrival error :${error}`;
            console.error(message)
            return of({product:null,error:message})
        }))
    }



}