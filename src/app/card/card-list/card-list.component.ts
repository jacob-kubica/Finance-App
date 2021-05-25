import { Component, OnInit, OnDestroy } from '@angular/core';
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
  isLoading = false;
  private cardsSub: Subscription;

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
