import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AccountsService } from '../account.service';
import { Account } from '../account.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  account: Account;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private accountId: string;

  constructor(
    public accountsService: AccountsService,
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
      if (paramMap.has('accountId')) {
        this.mode = 'edit';
        this.accountId = paramMap.get('accountId');
        this.isLoading = true;
        this.accountsService.getAccount(this.accountId).subscribe(accountData => {
          this.isLoading = false;
          this.account = {
            id: accountData._id,
            title: accountData.title,
            name: accountData.name,
            description: accountData.description,
            interest: accountData.interest,
            limit: accountData.limit,
            dueDate: accountData.dueDate,
            institution: accountData.institution,
            balance: accountData.balance,
            content: accountData.content,
            imagePath: accountData.imagePath
          };
          this.form.setValue({
            title: this.account.title,
            content: this.account.content,
            name: this.account.name,
            description: this.account.description,
            interest: this.account.interest,
            limit: this.account.limit,
            dueDate: this.account.dueDate,
            institution: this.account.institution,
            balance: this.account.balance,
            image: this.account.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.accountId = null;
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

  onSaveAccount() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.accountsService.addAccount(
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
      this.accountsService.updateAccount(
        this.accountId,
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
