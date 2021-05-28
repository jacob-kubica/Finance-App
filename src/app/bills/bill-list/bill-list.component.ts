import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Bill } from '../bill.model';
import { BillsService } from '../bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit, OnDestroy {
  // bills = [
  //   { title: "First Bill", content: "This is the first bill's content" },
  //   { title: "Second Bill", content: "This is the second bill's content" },
  //   { title: "Third Bill", content: "This is the third bill's content" }
  // ];
  bills: Bill[] = [];
  isLoading = false;
  private billsSub: Subscription;

  constructor(public billsService: BillsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.billsService.getBills();
    this.billsSub = this.billsService.getBillUpdateListener()
      .subscribe((bills: Bill[]) => {
        this.isLoading = false;
        this.bills = bills;
      });
  }

  onDelete(billId: string) {
    this.billsService.deleteBill(billId);
  }

  ngOnDestroy() {
    this.billsSub.unsubscribe();
  }
}
