import { Component, OnDestroy, OnInit } from "@angular/core";

import { Budget } from "../budget.model";
import { BudgetsService } from "../budget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-budget-list",
  templateUrl: "./budget-list.component.html",
  styleUrls: ["./budget-list.component.css"],
})
export class BudgetListComponent implements OnInit, OnDestroy {
  // budgets = [
  //   { title: "First Budget", content: "This is the first budget's content" },
  //   { title: "Second Budget", content: "This is the second budget's content" },
  //   { title: "Third Budget", content: "This is the third budget's content" }
  // ];
  budgets: Budget[] = [];
  isLoading = false;
  private budgetsSub: Subscription;

  constructor(public budgetsService: BudgetsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.budgetsService.getBudgets();
    this.budgetsSub = this.budgetsService
      .getBudgetUpdateListener()
      .subscribe((budgets: Budget[]) => {
        this.isLoading = false;
        this.budgets = budgets;
      });
  }

  onDelete(budgetId: string) {
    this.budgetsService.deleteBudget(budgetId);
  }

  ngOnDestroy() {
    this.budgetsSub.unsubscribe();
  }
}
