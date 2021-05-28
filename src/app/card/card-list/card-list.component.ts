import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { DoCheck } from '@angular/core';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';

import { TransitionCheckState } from '@angular/material';
import { Subscription } from 'rxjs';

import { Card } from '../card.model';
import { CardsService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy {
  // cards = [
  //   { title: "First Card", content: "This is the first card's content" },
  //   { title: "Second Card", content: "This is the second card's content" },
  //   { title: "Third Card", content: "This is the third card's content" }
  // ];
  cards: Card[] = [];
  utilization: number;
  totalLimit = 0;
  totalBalance = 0;
  maxInterest = 0;
  estimatedInterestAnnual = 0;
  estimatedInterest = 0;
  isLoading = false;
  private cardsSub: Subscription;

  private monthlyPayment = 100;
  private netMonthlyIncome = 4500;
  private amount = 10;




  constructor(public cardsService: CardsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.cardsService.getCards();
    this.cardsSub = this.cardsService.getCardUpdateListener()
      .subscribe((cards: Card[]) => {
        this.isLoading = false;
        this.cards = cards;
        this.calculateUtilization();
      });

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


  onDelete(cardId: string) {
    this.cardsService.deleteCard(cardId);
  }

  ngOnDestroy() {
    this.cardsSub.unsubscribe();
  }
}
