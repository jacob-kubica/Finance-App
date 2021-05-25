import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Card } from './card.model';

@Injectable({ providedIn: 'root' })
export class CardsService {
  private cards: Card[] = [];
  private cardsUpdated = new Subject<Card[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getCards() {
    this.http
      .get<{ message: string; cards: any }>('http://localhost:3000/api/cards')
      .pipe(
        map(cardData => {
          return cardData.cards.map(card => {
            return {
              title: card.title,
              content: card.content,
              id: card._id,
              name: card.name,
              description: card.description,
              interest: card.interest,
              limit: card.limit,
              dueDate: card.dueDate,
              institution: card.institution,
              balance: card.balance,
              imagePath: card.imagePath
            };
          });
        })
      )
      .subscribe(transformedCards => {
        this.cards = transformedCards;
        this.cardsUpdated.next([...this.cards]);
      });
  }

  getCardUpdateListener() {
    return this.cardsUpdated.asObservable();
  }

  getCard(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      name: string,
      description: string,
      interest: number,
      limit: number,
      dueDate: Date,
      institution: string,
      balance: number,
      imagePath: string
    }>(
      'http://localhost:3000/api/cards/' + id
    );
  }

  addCard(
    title: string,
    content: string,
    name: string,
    description: string,
    interest,
    limit,
    dueDate,
    institution: string,
    balance,
    image: File
  ) {
    const cardData = new FormData();
    cardData.append('title', title);
    cardData.append('content', content);
    cardData.append('name', name);
    cardData.append('description', description);
    cardData.append('interest', interest);
    cardData.append('limit', limit);
    cardData.append('dueDate', dueDate);
    cardData.append('institution', institution);
    cardData.append('balance', balance);
    cardData.append('image', image, title);
    this.http
      .post<{ message: string; card: Card }>(
        'http://localhost:3000/api/cards',
        cardData
      )
      .subscribe(responseData => {
        const card: Card = {
          id: responseData.card.id,
          title: title,
          content: content,
          name: name,
          description: description,
          interest: interest,
          limit: limit,
          dueDate: dueDate,
          institution: institution,
          balance: balance,
          imagePath: responseData.card.imagePath
        };
        this.cards.push(card);
        this.cardsUpdated.next([...this.cards]);
        this.router.navigate(['/']);
      });
  }

  updateCard(
    id: string,
    title: string,
    content: string,
    name: string,
    description: string,
    interest,
    limit,
    dueDate,
    institution: string,
    balance,
    image: File | string
  ) {
    let cardData: Card | FormData;

    if (typeof image === 'object') {
      cardData = new FormData();
      cardData.append('id', id);
      cardData.append('title', title);
      cardData.append('content', content);
      cardData.append('name', name);
      cardData.append('description', description);
      cardData.append('interest', interest);
      cardData.append('limit', limit);
      cardData.append('dueDate', dueDate);
      cardData.append('institution', institution);
      cardData.append('balance', balance);
      cardData.append('image', image, title);
    } else {
      cardData = {
        id: id,
        title: title,
        content: content,
        name: name,
        description: description,
        interest: interest,
        limit: limit,
        dueDate: dueDate,
        institution: institution,
        balance: balance,
        imagePath: image
      };
    }
    this.http
      .put('http://localhost:3000/api/cards/' + id, cardData)
      .subscribe(response => {
        const updatedCards = [...this.cards];
        const oldCardIndex = updatedCards.findIndex(p => p.id === id);
        const card: Card = {
          id: id,
          title: title,
          content: content,
          name: name,
          description: description,
          interest: interest,
          limit: limit,
          dueDate: dueDate,
          institution: institution,
          balance: balance,
          imagePath: ''
        };
        updatedCards[oldCardIndex] = card;
        this.cards = updatedCards;
        this.cardsUpdated.next([...this.cards]);
        this.router.navigate(['/']);
      });
  }

  deleteCard(cardId: string) {
    this.http
      .delete('http://localhost:3000/api/cards/' + cardId)
      .subscribe(() => {
        const updatedCards = this.cards.filter(card => card.id !== cardId);
        this.cards = updatedCards;
        this.cardsUpdated.next([...this.cards]);
      });
  }
}
