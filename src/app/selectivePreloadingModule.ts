import { Injectable } from "@angular/core";
import { PreloadingStrategy } from '@angular/router';
import { of } from 'rxjs';

@Injectable({providedIn:'root'})
export class SelectivePrelodingModule implements PreloadingStrategy{
    preload(route: import("@angular/router").Route, fn: () => import("rxjs").Observable<any>): import("rxjs").Observable<any> {
        if(route.data&&route.data['preload']){
            return fn()
        }else{
            return of(null);
        }
    }



}