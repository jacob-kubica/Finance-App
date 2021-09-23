import { Bill } from "./bill.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class BillsService {
  private bills: Bill[] = [];
  private billsUpdated = new Subject<Bill[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getBills() {
    this.http
      .get<{ message: string; bills: any }>("http://localhost:3000/api/bills")
      .pipe(
        map((billData) => {
          return billData.bills.map((bill) => {
            return {
              id: bill._id,
              title: bill.title,
              amount: bill.amount,
              description: bill.description,
              institution: bill.institution,
              category: bill.category,
              frequency: bill.frequency,
              dueDate: bill.dueDate,
              paymentMethod: bill.paymentMethod,
              imagePath: bill.imagePath,
            };
          });
        })
      )
      .subscribe((transformedBills) => {
        this.bills = transformedBills;
        this.billsUpdated.next([...this.bills]);
      });
  }

  getBillUpdateListener() {
    return this.billsUpdated.asObservable();
  }

  getBill(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      amount;
      description: string;
      institution: string;
      category: string;
      frequency: string;
      dueDate: Date;
      paymentMethod: string;
      imagePath: string;
    }>("http://localhost:3000/api/bills/" + id);
  }

  addBill(
    title: string,
    amount,
    description: string,
    institution: string,
    category: string,
    frequency: string,
    dueDate,
    paymentMethod: string,
    image: File
  ) {
    const billData = new FormData();
    billData.append("title", title);
    billData.append("amount", amount);
    billData.append("description", description);
    billData.append("institution", institution);
    billData.append("category", category);
    billData.append("frequency", frequency);
    billData.append("dueDate", dueDate);
    billData.append("paymentMethod", paymentMethod);
    billData.append("image", image, title);
    this.http
      .post<{ message: string; bill: Bill }>(
        "http://localhost:3000/api/bills",
        billData
      )
      .subscribe((responseData) => {
        const bill: Bill = {
          id: responseData.bill.id,
          title: title,
          amount: amount,
          description: description,
          institution: institution,
          category: category,
          frequency: frequency,
          dueDate: dueDate,
          paymentMethod: paymentMethod,
          imagePath: responseData.bill.imagePath,
        };
        this.bills.push(bill);
        this.billsUpdated.next([...this.bills]);
        this.router.navigate(["/"]);
      });
  }

  updateBill(
    id: string,
    title: string,
    amount,
    description: string,
    institution: string,
    category: string,
    frequency: string,
    dueDate,
    paymentMethod: string,
    image: File | string
  ) {
    let billData: Bill | FormData;

    if (typeof image === "object") {
      billData = new FormData();
      billData.append("id", id);
      billData.append("title", title);
      billData.append("amount", amount);
      billData.append("description", description);
      billData.append("institution", institution);
      billData.append("category", category);
      billData.append("frequency", frequency);
      billData.append("dueDate", dueDate);
      billData.append("paymentMethod", paymentMethod);
      billData.append("image", image, title);
    } else {
      billData = {
        id: id,
        title: title,
        amount: amount,
        description: description,
        institution: institution,
        category: category,
        frequency: frequency,
        dueDate: dueDate,
        paymentMethod: paymentMethod,
        imagePath: image,
      };
    }
    this.http
      .put("http://localhost:3000/api/bills/" + id, billData)
      .subscribe((response) => {
        const updatedBills = [...this.bills];
        const oldBillIndex = updatedBills.findIndex((p) => p.id === id);
        const bill: Bill = {
          id: id,
          title: title,
          amount: amount,
          description: description,
          institution: institution,
          category: category,
          frequency: frequency,
          dueDate: dueDate,
          paymentMethod: paymentMethod,
          imagePath: "",
        };
        updatedBills[oldBillIndex] = bill;
        this.bills = updatedBills;
        this.billsUpdated.next([...this.bills]);
        this.router.navigate(["/"]);
      });
  }

  deleteBill(billId: string) {
    this.http
      .delete("http://localhost:3000/api/bills/" + billId)
      .subscribe(() => {
        const updatedBills = this.bills.filter((bill) => bill.id !== billId);
        this.bills = updatedBills;
        this.billsUpdated.next([...this.bills]);
      });
  }
}
