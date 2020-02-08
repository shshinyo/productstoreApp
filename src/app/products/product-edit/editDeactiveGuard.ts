import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

@Injectable({providedIn:'root'})
export class deactivateGuard implements CanDeactivate<ProductEditComponent>{
    canDeactivate(component: ProductEditComponent, 
        currentRoute: import("@angular/router").ActivatedRouteSnapshot,
         currentState: import("@angular/router").RouterStateSnapshot,
          nextState?: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
       if(component.isDirty){
           const productName=component.product.productName||'New Product';
           return confirm(`Navigate away and lose your changes on ${productName}`)
       }
       return true;
    }

}