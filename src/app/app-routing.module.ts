import { RouterModule, Routes } from "@angular/router";

import { AccountCreateComponent } from "./accounts/account-create/account-create.component";
import { AccountListComponent } from "./accounts/account-list/account-list.component";
import { BillCreateComponent } from "./bills/bill-create/bill-create.component";
import { BillListComponent } from "./bills/bill-list/bill-list.component";
import { BudgetCreateComponent } from "./budget/budget-create/budget-create.component";
import { BudgetListComponent } from "./budget/budget-list/budget-list.component";
import { CardCreateComponent } from "./card/card-create/card-create.component";
import { CardListComponent } from "./card/card-list/card-list.component";
import { NgModule } from "@angular/core";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";

const routes: Routes = [
  { path: "", component: PostListComponent },
  { path: "create", component: PostCreateComponent },
  { path: "edit/:postId", component: PostCreateComponent },

  { path: "card", component: CardListComponent },
  { path: "card/create", component: CardCreateComponent },
  { path: "card/edit/:cardId", component: CardCreateComponent },

  { path: "bill", component: BillListComponent },
  { path: "bill/create", component: BillCreateComponent },
  { path: "bill/edit/:billId", component: BillCreateComponent },

  { path: "account", component: AccountListComponent },
  { path: "account/create", component: AccountCreateComponent },
  { path: "account/edit/:accountId", component: AccountCreateComponent },

  { path: "budgets", component: BudgetListComponent },
  { path: "budgets/create", component: BudgetCreateComponent },
  { path: "budgets/edit/:accountId", component: BudgetCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
