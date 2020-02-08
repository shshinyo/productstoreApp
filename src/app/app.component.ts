import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router, RouterEvent,Event, NavigationStart, NavigationCancel, NavigationError, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Your Store';
  loadingSpinner:boolean;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }
  checkRouterEvent(routerevent:Event){
if(routerevent instanceof NavigationStart){
  this.loadingSpinner=true
}if(routerevent instanceof NavigationCancel||
  routerevent instanceof NavigationEnd||
    routerevent instanceof NavigationError){
this.loadingSpinner=false;
}
  }

  constructor(private authService: AuthService,private router:Router,private messServ:MessageService ) { 
    this.router.events.subscribe((routerEvent:Event)=>{
            this.checkRouterEvent(routerEvent)
    })
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome')
  }
  get isDisplayed() :boolean{
    return this.messServ.isDisplayed;
  }
  showMessages():void{
      this.router.navigate([{outlets:{popup:['messages']}}])
      this.messServ.isDisplayed=true;
  }
  hideMessages() :void{
    this.messServ.isDisplayed=false;
    this.router.navigate([{outlets:{popup:null}}])
  }
}
