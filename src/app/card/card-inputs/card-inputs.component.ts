


import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import * as moment from 'moment';




import { Subscription } from 'rxjs';
import { Card } from '../card.model';
import { CardsService } from '../card.service';


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

  private netMonthlyIncome = 4500;
  private amount = 10;
  private monthlyPayment = 450;
  private number_of_payments_snowball = 0;
  total_interest = 0;
  private payoff_date = moment().format('YYYY MM DD');


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
    // deep copy of cards
    const cardsCopy = this.cards.map(a => ({ ...a }));
    let number_of_payments_snowball = 0;
    let payment = this.monthlyPayment;
    let total_interest = 0;
    cardsCopy.sort((a, b) => (a.balance > b.balance) ? 1 : -1);

    function incrementInterest() {
      let interest_accumulated = 0;
      cardsCopy.forEach(card => {
        interest_accumulated += (card.balance * card.interest / 12);
        card.balance += (card.balance * card.interest / 12);
      });
      if (interest_accumulated > payment) {
        total_interest = 1 / 0;
        return (true);
      }
      total_interest += interest_accumulated;


    }

    cardsCopy.forEach(card => {
      while (card.balance > 0) {
        if (card.balance > payment) {
          console.log(card.name + ' balance is ' + card.balance);
          console.log(payment);
          card.balance -= payment;
          payment = this.monthlyPayment;
          number_of_payments_snowball++;
          if (incrementInterest()) {
            number_of_payments_snowball = 1 / 0;
            break;
          };
        } else {
          payment = payment - card.balance;
          card.balance = 0;
          console.log(card.balance);
        }
      }

    });
    number_of_payments_snowball++;
    const startDate = new Date();
    const endDateMoment = moment(startDate); // moment(...) can also be used to parse dates in string format
    endDateMoment.add(number_of_payments_snowball, 'months');
    this.payoff_date = endDateMoment.format('YYYY MM DD');
    this.total_interest = total_interest;
    this.number_of_payments_snowball = number_of_payments_snowball;

  }

}

