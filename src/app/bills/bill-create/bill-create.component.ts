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

  constructor(
    public billsService: BillsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      name: new FormControl(null),
      description: new FormControl(null),
      interest: new FormControl(null),
      limit: new FormControl(null),
      dueDate: new FormControl(null),
      institution: new FormControl(null),
      balance: new FormControl(null),
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
            name: billData.name,
            description: billData.description,
            interest: billData.interest,
            limit: billData.limit,
            dueDate: billData.dueDate,
            institution: billData.institution,
            balance: billData.balance,
            content: billData.content,
            imagePath: billData.imagePath,
          };
          this.form.setValue({
            title: this.bill.title,
            content: this.bill.content,
            name: this.bill.name,
            description: this.bill.description,
            interest: this.bill.interest,
            limit: this.bill.limit,
            dueDate: this.bill.dueDate,
            institution: this.bill.institution,
            balance: this.bill.balance,
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
        this.form.value.content,
        this.form.value.name,
        this.form.value.description,
        this.form.value.interest,
        this.form.value.limit,
        this.form.value.dueDate,
        this.form.value.institution,
        this.form.value.balance,
        this.form.value.image
      );
    } else {
      this.billsService.updateBill(
        this.billId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.name,
        this.form.value.description,
        this.form.value.interest,
        this.form.value.limit,
        this.form.value.dueDate,
        this.form.value.institution,
        this.form.value.balance,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
