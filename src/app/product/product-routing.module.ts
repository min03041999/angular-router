import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CheckEditGuard } from '../check-edit.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'detail/:id',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ProductDetailComponent
          },
          {
            path: 'edit',
            component: ProductEditComponent,
            canDeactivate: [CheckEditGuard]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
