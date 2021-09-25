import { Account } from "./account.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AccountsService {
  private accounts: Account[] = [];
  private accountsUpdated = new Subject<Account[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getAccounts() {
    this.http
      .get<{ message: string; accounts: any }>(
        "http://localhost:3000/api/accounts"
      )
      .pipe(
        map((accountData) => {
          return accountData.accounts.map((account) => {
            return {
              title: account.title,
              content: account.content,
              id: account._id,
              name: account.name,
              description: account.description,
              interest: account.interest,
              limit: account.limit,
              dueDate: account.dueDate,
              institution: account.institution,
              balance: account.balance,
              imagePath: account.imagePath,
            };
          });
        })
      )
      .subscribe((transformedAccounts) => {
        this.accounts = transformedAccounts;
        this.accountsUpdated.next([...this.accounts]);
      });
  }

  getAccountUpdateListener() {
    return this.accountsUpdated.asObservable();
  }

  getAccount(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      name: string;
      description: string;
      interest: number;
      limit: number;
      dueDate: Date;
      institution: string;
      balance: number;
      imagePath: string;
    }>("http://localhost:3000/api/accounts/" + id);
  }

  addAccount(
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
    const accountData = new FormData();
    accountData.append("title", title);
    accountData.append("content", content);
    accountData.append("name", name);
    accountData.append("description", description);
    accountData.append("interest", interest);
    accountData.append("limit", limit);
    accountData.append("dueDate", dueDate);
    accountData.append("institution", institution);
    accountData.append("balance", balance);
    accountData.append("image", image, title);
    this.http
      .post<{ message: string; account: Account }>(
        "http://localhost:3000/api/accounts",
        accountData
      )
      .subscribe((responseData) => {
        const account: Account = {
          id: responseData.account.id,
          title: title,
          content: content,
          name: name,
          description: description,
          interest: interest,
          limit: limit,
          dueDate: dueDate,
          institution: institution,
          balance: balance,
          imagePath: responseData.account.imagePath,
        };
        this.accounts.push(account);
        this.accountsUpdated.next([...this.accounts]);
        this.router.navigate(["/"]);
      });
  }

  updateAccount(
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
    let accountData: Account | FormData;

    if (typeof image === "object") {
      accountData = new FormData();
      accountData.append("id", id);
      accountData.append("title", title);
      accountData.append("content", content);
      accountData.append("name", name);
      accountData.append("description", description);
      accountData.append("interest", interest);
      accountData.append("limit", limit);
      accountData.append("dueDate", dueDate);
      accountData.append("institution", institution);
      accountData.append("balance", balance);
      accountData.append("image", image, title);
    } else {
      accountData = {
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
        imagePath: image,
      };
    }
    this.http
      .put("http://localhost:3000/api/accounts/" + id, accountData)
      .subscribe((response) => {
        const updatedAccounts = [...this.accounts];
        const oldAccountIndex = updatedAccounts.findIndex((p) => p.id === id);
        const account: Account = {
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
          imagePath: "",
        };
        updatedAccounts[oldAccountIndex] = account;
        this.accounts = updatedAccounts;
        this.accountsUpdated.next([...this.accounts]);
        this.router.navigate(["/"]);
      });
  }

  deleteAccount(accountId: string) {
    this.http
      .delete("http://localhost:3000/api/accounts/" + accountId)
      .subscribe(() => {
        const updatedAccounts = this.accounts.filter(
          (account) => account.id !== accountId
        );
        this.accounts = updatedAccounts;
        this.accountsUpdated.next([...this.accounts]);
      });
  }
}
