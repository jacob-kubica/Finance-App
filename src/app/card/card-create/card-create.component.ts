import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CardsService } from '../card.service';
import { Card } from '../card.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  card: Card;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private cardId: string;

  constructor(
    public cardsService: CardsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      name: new FormControl(null),
      description: new FormControl(null),
      interest: new FormControl(null),
      limit: new FormControl(null),
      dueDate: new FormControl(null),
      institution: new FormControl(null),
      balance: new FormControl(null)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('cardId')) {
        this.mode = 'edit';
        this.cardId = paramMap.get('cardId');
        this.isLoading = true;
        this.cardsService.getCard(this.cardId).subscribe(cardData => {
          this.isLoading = false;
          this.card = {
            id: cardData._id,
            title: cardData.title,
            name: cardData.name,
            description: cardData.description,
            interest: cardData.interest,
            limit: cardData.limit,
            dueDate: cardData.dueDate,
            institution: cardData.institution,
            balance: cardData.balance,
            content: cardData.content,
            imagePath: cardData.imagePath
          };
          this.form.setValue({
            title: this.card.title,
            content: this.card.content,
            name: this.card.name,
            description: this.card.description,
            interest: this.card.interest,
            limit: this.card.limit,
            dueDate: this.card.dueDate,
            institution: this.card.institution,
            balance: this.card.balance,
            image: this.card.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.cardId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveCard() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.cardsService.addCard(
        this.form.value.title,
        this.form.value.content,
        this.form.value.name,
        this.form.value.description,
        this.form.value.interest,
        this.form.value.limit,
        this.form.value.dueDate,
        this.form.value.institution,
        this.form.value.balance,
        this.form.value.image
      );
    } else {
      this.cardsService.updateCard(
        this.cardId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.name,
        this.form.value.description,
        this.form.value.interest,
        this.form.value.limit,
        this.form.value.dueDate,
        this.form.value.institution,
        this.form.value.balance,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
