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
      });

  }



  onDelete(cardId: string) {
    this.cardsService.deleteCard(cardId);
  }

  ngOnDestroy() {
    this.cardsSub.unsubscribe();
  }
}
