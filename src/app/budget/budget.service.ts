import { Budget } from "./budget.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class BudgetsService {
  private budgets: Budget[] = [];
  private budgetsUpdated = new Subject<Budget[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getBudgets() {
    console.log("Getting Budgets");
    this.http.get("http://localhost:8000/budgets").subscribe((budgets: any) => {
      this.budgets = [...budgets];
      this.budgetsUpdated.next([...this.budgets]);
    });

    console.log(this.budgets);
    //   .subscribe((transformedBudgets) => {
    //     this.budgets = transformedBudgets;
    //     this.budgetsUpdated.next([...this.budgets]);
    //   });

    //   console.log(budgets)
    // );

    // // this.http
    // //   .get<{ message: string; budgets: any }>("http://localhost:8000/budgets")
    // //   .pipe(
    // //     map((budgetData) => {
    // //       return budgetData.budgets.map((budget) => {
    // //         return {
    // //           id: budget._id,
    // //           budgetItem: budget.budgetItem,
    // //           budgetCategory: budget.budgetCategory,
    // //           percentage: budget.percentage,
    // //           percentageCategory: budget.percentageCategory,
    // //           exemptFromRecalculation: budget.exemptFromRecalculation,
    // //           fixedPriceValue: budget.fixedPriceValue,
    // //           contribution: budget.contribution,
    // //         };
    // //       });
    // //     })
    // //   )
    // //   .subscribe((transformedBudgets) => {
    // //     this.budgets = transformedBudgets;
    // //     this.budgetsUpdated.next([...this.budgets]);
    // //   });
  }

  getBudgetUpdateListener() {
    return this.budgetsUpdated.asObservable();
  }

  getBudget(id: string) {
    return this.http.get<{
      _id: string;
      budgetItem: string;
      budgetCategory: string;
      percentage: number;
      percentageCategory: number;
      exemptFromRecalculation: boolean;
      fixedPriceValue: number;
      contribution: number;
    }>("http://localhost:8000/budgets/" + id);
  }

  addBudget(
    budgetItem: string,
    budgetCategory: string,
    percentage: number,
    percentageCategory: number,
    exemptFromRecalculation: boolean,
    fixedPriceValue: number,
    contribution: number
  ) {
    // const budgetData = new FormData();
    // budgetData.append("title", title);
    // budgetData.append("amount", amount);
    // budgetData.append("description", description);
    // budgetData.append("institution", institution);
    // budgetData.append("category", category);
    // budgetData.append("frequency", frequency);
    // budgetData.append("dueDate", dueDate);
    // budgetData.append("paymentMethod", paymentMethod);
    // budgetData.append("image", image, title);
    // this.http
    //   .post<{ message: string; budget: Budget }>(
    //     "http://localhost:3000/api/budgets",
    //     budgetData
    //   )
    //   .subscribe((responseData) => {
    //     const budget: Budget = {
    //       id: responseData.budget.id,
    //       title: title,
    //       amount: amount,
    //       description: description,
    //       institution: institution,
    //       category: category,
    //       frequency: frequency,
    //       dueDate: dueDate,
    //       paymentMethod: paymentMethod,
    //       imagePath: responseData.budget.imagePath,
    //     };
    //     this.budgets.push(budget);
    //     this.budgetsUpdated.next([...this.budgets]);
    //     this.router.navigate(["/"]);
    //   });
  }

  updateBudget(
    id: string,
    budgetItem: string,
    budgetCategory: string,
    percentage: number,
    percentageCategory: number,
    exemptFromRecalculation: boolean,
    fixedPriceValue: number,
    contribution: number
  ) {
    // let budgetData: Budget | FormData;
    // if (typeof image === "object") {
    //   budgetData = new FormData();
    //   budgetData.append("id", id);
    //   budgetData.append("title", title);
    //   budgetData.append("amount", amount);
    //   budgetData.append("description", description);
    //   budgetData.append("institution", institution);
    //   budgetData.append("category", category);
    //   budgetData.append("frequency", frequency);
    //   budgetData.append("dueDate", dueDate);
    //   budgetData.append("paymentMethod", paymentMethod);
    //   budgetData.append("image", image, title);
    // } else {
    //   budgetData = {
    //     id: id,
    //     title: title,
    //     amount: amount,
    //     description: description,
    //     institution: institution,
    //     category: category,
    //     frequency: frequency,
    //     dueDate: dueDate,
    //     paymentMethod: paymentMethod,
    //     imagePath: image,
    //   };
    // }
    // this.http
    //   .put("http://localhost:3000/api/budgets/" + id, budgetData)
    //   .subscribe((response) => {
    //     const updatedBudgets = [...this.budgets];
    //     const oldBudgetIndex = updatedBudgets.findIndex((p) => p.id === id);
    //     const budget: Budget = {
    //       id: id,
    //       title: title,
    //       amount: amount,
    //       description: description,
    //       institution: institution,
    //       category: category,
    //       frequency: frequency,
    //       dueDate: dueDate,
    //       paymentMethod: paymentMethod,
    //       imagePath: "",
    //     };
    //     updatedBudgets[oldBudgetIndex] = budget;
    //     this.budgets = updatedBudgets;
    //     this.budgetsUpdated.next([...this.budgets]);
    //     this.router.navigate(["/"]);
    //   });
  }

  deleteBudget(budgetId: string) {
    // this.http
    //   .delete("http://localhost:3000/api/budgets/" + budgetId)
    //   .subscribe(() => {
    //     const updatedBudgets = this.budgets.filter(
    //       (budget) => budget.id !== budgetId
    //     );
    //     this.budgets = updatedBudgets;
    //     this.budgetsUpdated.next([...this.budgets]);
    //   });
  }
}
