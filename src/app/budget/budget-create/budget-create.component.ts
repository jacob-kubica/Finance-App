import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Budget } from "../budget.model";
import { BudgetsService } from "../budget.service";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-budget-create",
  templateUrl: "./budget-create.component.html",
  styleUrls: ["./budget-create.component.css"],
})
export class BudgetCreateComponent implements OnInit {
  budget: Budget;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private budgetId: string;
  categories = [
    "Investments",
    "Budget & Utilities",
    "Fee & Charges",
    "Business Services",
    "Alcohol",
    "Food & Dining",
    "Service & Parts",
    "Auto & Transport",
    "Motorcycle",
    "Insurance",
    "Education",
    "Health & Fitness",
    "Entertainment",
    "Shopping",
    "Rent",
  ];
  frequencies = [
    "daily",
    "biweekly",
    "monthly",
    "quarterly",
    "biannaul",
    "annual",
  ];
  paymentMethods = ["Amex", "Visa", "Mastercard", "Cash"];
  constructor(
    public budgetsService: BudgetsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      budgetItem: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      budgetCategory: new FormControl(null),
      percentage: new FormControl(null),
      percentageCategory: new FormControl(null),
      exemptFromRecalculation: new FormControl(null),
      fixedPriceValue: new FormControl(null),
      contribution: new FormControl(null),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("budgetId")) {
        this.mode = "edit";
        this.budgetId = paramMap.get("budgetId");
        this.isLoading = true;
        this.budgetsService.getBudget(this.budgetId).subscribe((budgetData) => {
          this.isLoading = false;
          this.budget = {
            _id: this.budgetId,
            budgetItem: budgetData.budgetItem,
            budgetCategory: budgetData.budgetCategory,
            percentage: budgetData.percentage,
            percentageCategory: budgetData.percentageCategory,
            exemptFromRecalculation: budgetData.exemptFromRecalculation,
            fixedPriceValue: budgetData.fixedPriceValue,
            contribution: budgetData.contribution,
          };
          this.form.setValue({
            budgetItem: this.budget.budgetItem,
            budgetCategory: this.budget.budgetCategory,
            percentage: this.budget.percentage,
            percentageCategory: this.budget.percentageCategory,
            exemptFromRecalculation: this.budget.exemptFromRecalculation,
            fixedPriceValue: this.budget.fixedPriceValue,
            contribution: this.budget.contribution,
          });
        });
      } else {
        this.mode = "create";
        this.budgetId = null;
      }
    });
  }

  onSaveBudget() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.budgetsService.addBudget(
        this.form.value.budgetItem,
        this.form.value.budgetCategory,
        this.form.value.percentage,
        this.form.value.percentageCategory,
        this.form.value.exemptFromRecalculation,
        this.form.value.fixedPriceValue,
        this.form.value.contribution
      );
    } else {
      this.budgetsService.updateBudget(
        this.budgetId,
        this.form.value.budgetItem,
        this.form.value.budgetCategory,
        this.form.value.percentage,
        this.form.value.percentageCategory,
        this.form.value.exemptFromRecalculation,
        this.form.value.fixedPriceValue,
        this.form.value.contribution
      );
    }
    this.form.reset();
  }
}
