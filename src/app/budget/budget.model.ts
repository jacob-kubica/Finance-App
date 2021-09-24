export class Budget {
  _id: string;
  budgetItem: string;
  budgetCategory: string;
  percentage: number;
  percentageCategory: number;
  exemptFromRecalculation: boolean;
  fixedPriceValue: number;
  contribution: number;
}
