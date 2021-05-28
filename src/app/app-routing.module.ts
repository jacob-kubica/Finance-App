import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

import { CardListComponent } from './card/card-list/card-list.component';
import { CardCreateComponent } from './card/card-create/card-create.component';

import { BillListComponent } from './bills/bill-list/bill-list.component';
import { BillCreateComponent } from './bills/bill-create/bill-create.component';

import { AccountListComponent } from './accounts/account-list/account-list.component';
import { AccountCreateComponent } from './accounts/account-create/account-create.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent },

  { path: 'card', component: CardListComponent },
  { path: 'card/create', component: CardCreateComponent },
  { path: 'card/edit/:cardId', component: CardCreateComponent },

  { path: 'bill', component: BillListComponent },
  { path: 'bill/create', component: BillCreateComponent },
  { path: 'bill/edit/:billId', component: BillCreateComponent },


  { path: 'account', component: AccountListComponent },
  { path: 'account/create', component: AccountCreateComponent },
  { path: 'account/edit/:accountId', component: AccountCreateComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
