import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule,
} from "@angular/material";

import { AccountComponent } from "./accounts/account.component";
import { AccountCreateComponent } from "./accounts/account-create/account-create.component";
import { AccountListComponent } from "./accounts/account-list/account-list.component";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BarChartComponent } from "./charts/bar-chart/bar-chart.component";
import { BillComponent } from "./bills/bill.component";
import { BillCreateComponent } from "./bills/bill-create/bill-create.component";
import { BillListComponent } from "./bills/bill-list/bill-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { BubbleChartComponent } from "./charts/bubble-chart/bubble-chart.component";
import { CardComponent } from "./card/card.component";
import { CardCreateComponent } from "./card/card-create/card-create.component";
import { CardInputsComponent } from "./card/card-inputs/card-inputs.component";
import { CardListComponent } from "./card/card-list/card-list.component";
import { CardRepaymentComponent } from "./card/card-repayment/card-repayment.component";
import { ChartsModule } from "ng2-charts";
import { DoughnutChartComponent } from "./charts/doughnut-chart/doughnut-chart.component";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { LineChartComponent } from "./charts/line-chart/line-chart.component";
import { NgModule } from "@angular/core";
import { PieChartComponent } from "./charts/pie-chart/pie-chart.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { RadarChartComponent } from "./charts/radar-chart/radar-chart.component";
import { BudgetComponent } from './budget/budget.component';
import { BudgetCreateComponent } from './budget/budget-create/budget-create.component';
import { BudgetListComponent } from './budget/budget-list/budget-list.component';
import { IncomeComponent } from './income/income.component';
import { IncomeCreateComponent } from './income/income-create/income-create.component';
import { IncomeListComponent } from './income/income-list/income-list.component';
import { InvestmentComponent } from './investment/investment.component';
import { InvestmentCreateComponent } from './investment/investment-create/investment-create.component';
import { InvestmentListComponent } from './investment/investment-list/investment-list.component';
import { LiabilityComponent } from './liability/liability.component';
import { LiabilityCreateComponent } from './liability/liability-create/liability-create.component';
import { LiabilityListComponent } from './liability/liability-list/liability-list.component';
import { LoanComponent } from './loan/loan.component';
import { LoanCreateComponent } from './loan/loan-create/loan-create.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { WishComponent } from './wish/wish.component';
import { WishCreateComponent } from './wish/wish-create/wish-create.component';
import { WishListComponent } from './wish/wish-list/wish-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    CardComponent,
    CardCreateComponent,
    CardListComponent,
    BillCreateComponent,
    BillListComponent,
    AccountComponent,
    AccountCreateComponent,
    AccountListComponent,
    CardRepaymentComponent,
    CardInputsComponent,
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    DoughnutChartComponent,
    BudgetComponent,
    BudgetCreateComponent,
    BudgetListComponent,
    IncomeComponent,
    IncomeCreateComponent,
    IncomeListComponent,
    InvestmentComponent,
    InvestmentCreateComponent,
    InvestmentListComponent,
    LiabilityComponent,
    LiabilityCreateComponent,
    LiabilityListComponent,
    LoanComponent,
    LoanCreateComponent,
    LoanListComponent,
    WishComponent,
    WishCreateComponent,
    WishListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
