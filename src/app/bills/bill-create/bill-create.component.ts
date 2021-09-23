import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Bill } from "../bill.model";
import { BillsService } from "../bill.service";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-bill-create",
  templateUrl: "./bill-create.component.html",
  styleUrls: ["./bill-create.component.css"],
})
export class BillCreateComponent implements OnInit {
  bill: Bill;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private billId: string;
  categories = [
    "Investments",
    "Bill & Utilities",
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
    public billsService: BillsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      amount: new FormControl(null),
      description: new FormControl(null),
      institution: new FormControl(null),
      category: new FormControl(null),
      frequency: new FormControl(null),
      dueDate: new FormControl(null),
      paymentMethod: new FormControl(null),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("billId")) {
        this.mode = "edit";
        this.billId = paramMap.get("billId");
        this.isLoading = true;
        this.billsService.getBill(this.billId).subscribe((billData) => {
          this.isLoading = false;
          this.bill = {
            id: billData._id,
            title: billData.title,
            amount: billData.amount,
            description: billData.description,
            institution: billData.institution,
            category: billData.category,
            frequency: billData.frequency,
            dueDate: billData.dueDate,
            paymentMethod: billData.paymentMethod,
            imagePath: billData.imagePath,
          };
          this.form.setValue({
            title: this.bill.title,
            amount: this.bill.amount,
            description: this.bill.description,
            institution: this.bill.institution,
            category: this.bill.category,
            frequency: this.bill.frequency,
            dueDate: this.bill.dueDate,
            paymentMethod: this.bill.paymentMethod,
            image: this.bill.imagePath,
          });
        });
      } else {
        this.mode = "create";
        this.billId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveBill() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.billsService.addBill(
        this.form.value.title,
        this.form.value.amount,
        this.form.value.description,
        this.form.value.institution,
        this.form.value.category,
        this.form.value.frequency,
        this.form.value.dueDate,
        this.form.value.paymentMethod,
        this.form.value.image
      );
    } else {
      this.billsService.updateBill(
        this.billId,
        this.form.value.title,
        this.form.value.amount,
        this.form.value.description,
        this.form.value.institution,
        this.form.value.category,
        this.form.value.frequency,
        this.form.value.dueDate,
        this.form.value.paymentMethod,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
