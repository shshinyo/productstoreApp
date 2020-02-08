import { Injectable } from '@angular/core';
import { CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor(private serv:AuthService ,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn(state.url);
  }
  isLoggedIn(url:string) :boolean{
    if(this.serv.isLoggedIn){
      return true;
    }
    this.serv.redirectUrl=url;
    this.router.navigate(['/login'])
    return false
  }
  canLoad(route:Route): boolean  {
    return this.isLoggedIn(route.path)
  
} 
}
