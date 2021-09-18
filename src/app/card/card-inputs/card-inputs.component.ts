
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { Finance } from 'financejs';
import { Subscription } from 'rxjs';
import { Card } from '../card.model';
import { CardsService } from '../card.service';


import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-card-inputs',
  templateUrl: './card-inputs.component.html',
  styleUrls: ['./card-inputs.component.css']
})
export class CardInputsComponent implements OnInit, OnDestroy {
  cards: Card[] = [];
  utilization: number;
  totalLimit = 0;
  totalBalance = 0;
  maxInterest = 0;
  estimatedInterestAnnual = 0;
  estimatedInterest = 0;
  isLoading = false;
  private cardsSub: Subscription;
  finance = new Finance();
  private netMonthlyIncome = 4500;
  private amount = 10;
  private monthlyPayment = 450;
  private number_of_payments_snowball = 0;
  total_interest = 0;
  pay_down_schedule = [];

  lineChartData: ChartDataSets[] = [{ data: this.pay_down_schedule, label: 'Pay Down Schedule' }];
  lineChartLabels: Label[] = [];
  lineChartOptions = { responsive: true };
  lineChartColors: Color[] = [{ borderColor: 'black', backgroundColor: 'rgba(107, 168, 237,0.28)' }];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  payoff_date: string;

  constructor(public cardsService: CardsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.cardsService.getCards();
    this.cardsSub = this.cardsService.getCardUpdateListener()
      .subscribe((cards: Card[]) => {
        this.isLoading = false;
        this.cards = cards;
        this.calculateNumberOfPaymentsSnowball();
        this.calculateUtilization();
      });
  }

  onDelete(cardId: string) {
    this.cardsService.deleteCard(cardId);
  }

  ngOnDestroy() {
    this.cardsSub.unsubscribe();
  }

  refreshChart() {
    if (this.number_of_payments_snowball < 1000) {
      this.lineChartData = [
        {
          data: this.pay_down_schedule, label: 'Pay Down Schedule'
        },
      ];

      const temp_list = [];

      for (let index = 1; index < this.number_of_payments_snowball; index++) {
        const endDateMoment = moment();
        endDateMoment.add(index, 'months');
        temp_list.push(endDateMoment.format(' MMM, YYYY'));
      }

      this.lineChartLabels = temp_list;
    } else {
      this.lineChartData = [{ data: [], label: 'Too Many Data Points' }];
      this.lineChartLabels = [];

    }


  }


  calculateInterest(principal, time, rate, period) {
    const compoundInterest = (p, t, r, n) => {
      const amount = p * (Math.pow((1 + (r / n)), (n * t)));
      const interest = amount - p;
      return interest;
    };

    return compoundInterest(principal, time, rate, period);
  }

  compoundInterest(principal, annual_rate, n_times, t_years) {
    return principal * (Math.pow(1 + annual_rate / n_times, n_times * t_years) - 1);
  }

  calculateUtilization() {
    this.totalLimit = 1;
    this.totalBalance = 1;
    this.maxInterest = 0;
    this.estimatedInterest = 0;
    this.estimatedInterestAnnual = 0;

    this.cards.forEach(card => {

      this.totalLimit += card.limit;
      this.totalBalance += card.balance;
      this.maxInterest += this.calculateInterest(card.balance, 1 / 12, card.interest, 12);
      this.estimatedInterestAnnual += this.compoundInterest(card.balance, card.interest, 12, 1);
      this.estimatedInterest += this.compoundInterest(card.balance, card.interest, 12, 1 / 12);
    });
    this.utilization = this.totalBalance / this.totalLimit;
  }

  calculateInputAmount() {
    this.monthlyPayment = this.netMonthlyIncome * (this.amount / 100);
    this.calculateNumberOfPaymentsSnowball();
  }

  calculateInputPayment() {
    this.amount = (this.monthlyPayment / this.netMonthlyIncome) * 100;
    this.calculateNumberOfPaymentsSnowball();
  }

  calculuateInputs() {
    this.calculateInputAmount();
  }

  // Every month cards gain interest
  calculateNumberOfPaymentsSnowball() {

    // interim variables
    let number_of_payments_snowball = 1;
    let payment = this.monthlyPayment;
    let total_interest = 0;
    const pay_down_schedule = [];

    // deep copy of cards, then sort smallest balance to smallest
    const cardsCopy = this.cards.map(a => ({ ...a }));
    cardsCopy.sort((a, b) => (a.balance > b.balance) ? 1 : -1);

    // loop through copied cards
    cardsCopy.forEach(card => {
      // loop of unspecified length until card is balance 0
      while (card.balance > 0) {
        // ensure payment is smaller then balance
        if (card.balance > payment) {
          // decrease card balance.
          card.balance -= payment;
          // in case payment is not full monthly amount reset now
          payment = this.monthlyPayment;
          // move forward one cycle (month)
          number_of_payments_snowball++;
          // increments interest on all cards in copy by 1 month
          if (incrementInterest()) {
            // in case payments will never outpace interest
            number_of_payments_snowball = Infinity;
            break;
          }
        } else {
          // decrease payment
          payment -= card.balance;
          // wipes balance
          card.balance = 0;
        }
      }
    });

    function incrementInterest() {
      // temp value to hold interest accumulated in this run
      let interest_accumulated = 0;
      let total_balance = 0;
      // cycle through all cards
      cardsCopy.forEach(card => {
        const interest = (card.balance * card.interest / 12);
        // add interest for total and card balance
        interest_accumulated += interest;
        card.balance += interest;
        total_balance += card.balance;
      });
      // check that payment never is enough
      if (interest_accumulated > payment) {
        total_interest = Infinity;
        return (true);
      }
      // used to update total interest property
      total_interest += interest_accumulated;
      pay_down_schedule.push(total_balance.toFixed(2));
    }

    const startDate = new Date();
    const endDateMoment = moment(startDate);
    endDateMoment.add(number_of_payments_snowball, 'months');
    this.payoff_date = endDateMoment.format('MMMM DD, YYYY');
    this.total_interest = total_interest;
    this.pay_down_schedule = pay_down_schedule;
    console.log(this.pay_down_schedule);
    this.number_of_payments_snowball = number_of_payments_snowball;
    this.refreshChart();

  }

}

