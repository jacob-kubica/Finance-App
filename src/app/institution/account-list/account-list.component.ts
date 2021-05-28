import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Account } from '../account.model';
import { AccountsService } from '../account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, OnDestroy {
  // accounts = [
  //   { title: "First Account", content: "This is the first account's content" },
  //   { title: "Second Account", content: "This is the second account's content" },
  //   { title: "Third Account", content: "This is the third account's content" }
  // ];
  accounts: Account[] = [];
  isLoading = false;
  private accountsSub: Subscription;

  constructor(public accountsService: AccountsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.accountsService.getAccounts();
    this.accountsSub = this.accountsService.getAccountUpdateListener()
      .subscribe((accounts: Account[]) => {
        this.isLoading = false;
        this.accounts = accounts;
      });
  }

  onDelete(accountId: string) {
    this.accountsService.deleteAccount(accountId);
  }

  ngOnDestroy() {
    this.accountsSub.unsubscribe();
  }
}
