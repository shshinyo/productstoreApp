import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectivePrelodingModule } from './selectivePreloadingModule';

@NgModule({
    imports:[RouterModule.forRoot([{path:'welcome',component:WelcomeComponent},
    {path:'products',canActivate:[AuthGuard],data:{preload:false},
    loadChildren:()=>import('./products/product.module').
    then(m=>m.ProductModule)},
    {path:'',redirectTo:'welcome',pathMatch:'full'},
    {path:'**',component:PageNotFoundComponent}],{preloadingStrategy:SelectivePrelodingModule})],
    exports:[RouterModule]
})
export class AppRoutingModule {

}