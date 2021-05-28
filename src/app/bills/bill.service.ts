import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Bill } from './bill.model';

@Injectable({ providedIn: 'root' })
export class BillsService {
  private bills: Bill[] = [];
  private billsUpdated = new Subject<Bill[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getBills() {
    this.http
      .get<{ message: string; bills: any }>('http://localhost:3000/api/bills')
      .pipe(
        map(billData => {
          return billData.bills.map(bill => {
            return {
              title: bill.title,
              content: bill.content,
              id: bill._id,
              name: bill.name,
              description: bill.description,
              interest: bill.interest,
              limit: bill.limit,
              dueDate: bill.dueDate,
              institution: bill.institution,
              balance: bill.balance,
              imagePath: bill.imagePath
            };
          });
        })
      )
      .subscribe(transformedBills => {
        this.bills = transformedBills;
        this.billsUpdated.next([...this.bills]);
      });
  }

  getBillUpdateListener() {
    return this.billsUpdated.asObservable();
  }

  getBill(id: string) {
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
      'http://localhost:3000/api/bills/' + id
    );
  }

  addBill(
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
    const billData = new FormData();
    billData.append('title', title);
    billData.append('content', content);
    billData.append('name', name);
    billData.append('description', description);
    billData.append('interest', interest);
    billData.append('limit', limit);
    billData.append('dueDate', dueDate);
    billData.append('institution', institution);
    billData.append('balance', balance);
    billData.append('image', image, title);
    this.http
      .post<{ message: string; bill: Bill }>(
        'http://localhost:3000/api/bills',
        billData
      )
      .subscribe(responseData => {
        const bill: Bill = {
          id: responseData.bill.id,
          title: title,
          content: content,
          name: name,
          description: description,
          interest: interest,
          limit: limit,
          dueDate: dueDate,
          institution: institution,
          balance: balance,
          imagePath: responseData.bill.imagePath
        };
        this.bills.push(bill);
        this.billsUpdated.next([...this.bills]);
        this.router.navigate(['/']);
      });
  }

  updateBill(
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
    let billData: Bill | FormData;

    if (typeof image === 'object') {
      billData = new FormData();
      billData.append('id', id);
      billData.append('title', title);
      billData.append('content', content);
      billData.append('name', name);
      billData.append('description', description);
      billData.append('interest', interest);
      billData.append('limit', limit);
      billData.append('dueDate', dueDate);
      billData.append('institution', institution);
      billData.append('balance', balance);
      billData.append('image', image, title);
    } else {
      billData = {
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
      .put('http://localhost:3000/api/bills/' + id, billData)
      .subscribe(response => {
        const updatedBills = [...this.bills];
        const oldBillIndex = updatedBills.findIndex(p => p.id === id);
        const bill: Bill = {
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
        updatedBills[oldBillIndex] = bill;
        this.bills = updatedBills;
        this.billsUpdated.next([...this.bills]);
        this.router.navigate(['/']);
      });
  }

  deleteBill(billId: string) {
    this.http
      .delete('http://localhost:3000/api/bills/' + billId)
      .subscribe(() => {
        const updatedBills = this.bills.filter(bill => bill.id !== billId);
        this.bills = updatedBills;
        this.billsUpdated.next([...this.bills]);
      });
  }
}
