import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './productresolverservice';
import { ProductsResolver } from './productsresolver';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { AuthGuard } from '../user/auth.guard';
import { deactivateGuard } from './product-edit/editDeactiveGuard';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'',component:ProductListComponent},
      {path:':id',component:ProductDetailComponent ,resolve:{resolvedProduct:ProductResolver}},
      {path:':id/edit',component:ProductEditComponent,canDeactivate:[deactivateGuard] ,resolve:{resolvedProduct:ProductResolver},
       children:[{path:'',redirectTo:'info',pathMatch:'full'},
                  {path:'info',component:ProductEditInfoComponent},
                  {path:'tages',component:ProductEditTagsComponent}]},
      {path:'products/0/edit',component:ProductEditComponent} 
      
     ,
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent

  ]
})
export class ProductModule { }
