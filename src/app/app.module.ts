import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatListModule,
  MatDividerModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';
import { CardComponent } from './card/card.component';
import { CardCreateComponent } from './card/card-create/card-create.component';
import { CardListComponent } from './card/card-list/card-list.component';

import { BillComponent } from './bills/bill.component';
import { BillCreateComponent } from './bills/bill-create/bill-create.component';
import { BillListComponent } from './bills/bill-list/bill-list.component';

import { AccountComponent } from './accounts/account.component';
import { AccountCreateComponent } from './accounts/account-create/account-create.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { CardRepaymentComponent } from './card/card-repayment/card-repayment.component';
import { CardInputsComponent } from './card/card-inputs/card-inputs.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { BubbleChartComponent } from './charts/bubble-chart/bubble-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';


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
    DoughnutChartComponent
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
    MatIconModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
