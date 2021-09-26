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
    percentage,
    percentageCategory,
    exemptFromRecalculation,
    fixedPriceValue,
    contribution
  ) {
    const budgetData = new FormData();
    budgetData.append("budgetItem", budgetItem);
    budgetData.append("budgetCategory", budgetCategory);
    budgetData.append("percentage", percentage);
    budgetData.append("percentageCategory", percentageCategory);
    budgetData.append("exemptFromRecalculation", exemptFromRecalculation);
    budgetData.append("fixedPriceValue", fixedPriceValue);
    budgetData.append("contribution", contribution);
    this.http
      .post("http://localhost:8000/budgets", {
        budgetItem: budgetItem,
        budgetCategory: budgetCategory,
        percentage: percentage,
        percentageCategory: percentageCategory,
        exemptFromRecalculation: exemptFromRecalculation,
        fixedPriceValue: fixedPriceValue,
        contribution: contribution,
      })
      .subscribe((responseData: string) => {
        const budget: Budget = {
          _id: responseData,
          budgetItem: budgetItem,
          budgetCategory: budgetCategory,
          percentage: percentage,
          percentageCategory: percentageCategory,
          exemptFromRecalculation: exemptFromRecalculation,
          fixedPriceValue: fixedPriceValue,
          contribution: contribution,
        };
        this.budgets.push(budget);
        this.budgetsUpdated.next([...this.budgets]);
        this.router.navigate(["/budgets"]);
      });
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
    const budgetData = {
      budgetItem: budgetItem,
      budgetCategory: budgetCategory,
      percentage: percentage,
      percentageCategory: percentageCategory,
      exemptFromRecalculation: exemptFromRecalculation,
      fixedPriceValue: fixedPriceValue,
      contribution: contribution,
    };
    console.log("we are updating" + id);
    this.http
      .patch("http://localhost:8000/budgets/" + id, budgetData)
      .subscribe((response) => {
        const updatedBudgets = [...this.budgets];
        const oldBudgetIndex = updatedBudgets.findIndex((p) => p._id === id);
        const budget: Budget = {
          _id: id,
          budgetItem: budgetItem,
          budgetCategory: budgetCategory,
          percentage: percentage,
          percentageCategory: percentageCategory,
          exemptFromRecalculation: exemptFromRecalculation,
          fixedPriceValue: fixedPriceValue,
          contribution: contribution,
        };
        updatedBudgets[oldBudgetIndex] = budget;
        this.budgets = updatedBudgets;
        this.budgetsUpdated.next([...this.budgets]);
        this.router.navigate(["/budgets"]);
      });
  }

  deleteBudget(budgetId: string) {
    this.http
      .delete("http://localhost:8000/budgets/" + budgetId)
      .subscribe(() => {
        const updatedBudgets = this.budgets.filter(
          (budget) => budget._id !== budgetId
        );
        this.budgets = updatedBudgets;
        this.budgetsUpdated.next([...this.budgets]);
      });
  }
}
