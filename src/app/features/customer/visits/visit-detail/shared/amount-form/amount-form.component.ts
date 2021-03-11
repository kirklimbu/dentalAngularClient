import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { DateFormatter } from "angular-nepali-datepicker";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { Payment } from "src/app/core/models/payment";
import { VisitMain } from "src/app/core/models/visit-main.model";
import { VisitService } from "../../../services/visit.service";
import { VisitMainFormComponent } from "../../../shared/visit-main-form/visit-main-form.component";
import { VisitDetailService } from "../../services/visit-detail.service";
import { CustomJs } from "src/app/shared/customjs/custom.js";
import { FormatDate } from "src/app/core/constants/format-date";

@Component({
  selector: "app-amount-form",
  templateUrl: "./amount-form.component.html",
  styleUrls: ["./amount-form.component.scss"],
})
export class AmountFormComponent implements OnInit {
  /* props */

  payment = new Payment();
  amountForm: FormGroup;
  mode = "add";
  customerId: number;
  payTypeLists = [];
  // visitMainId: number;

  loading: boolean = false;
  subscriptions: Subscription[] = [];
  dateOfTransaction: string;
  formatDate = new FormatDate();
  customDate = new CustomJs();
  dobDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };
  constructor(
    private fb: FormBuilder,
    private visitDetailService: VisitDetailService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<AmountFormComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) {}

  ngOnInit(): void {
    this.mode = this.modalData.mode; // for add
    // this.mode === "add" ? this.fetchParamFromUrl() : this.fetchPaymentForm();
    this.fetchPaymentForm();
    this.buildamountForm();
    this.getCurrentDate();
  }

  buildamountForm() {
    if (this.mode === "add") {
      this.amountForm = this.fb.group({
        visitMainId: [this.payment.visitMainId],
        payType: [this.payment.payType],
        traAmt: [this.payment.traAmt],
        date: [this.payment.date],
      });
    } /* else {
      this.amountForm = this.fb.group({
        visitMainId: [this.payment.visitMainId],
        payType: [this.payment.payType],
        traAmt: [this.payment.traAmt],
        date: [this.payment.date],
      });
    } */
  }

  /*  fetchParamFromUrl() {
    this.spinner.show();
    this.route.queryParamMap.subscribe((params) => {
      this.customerId = +params.get("customerId");
      this.visitDetailService
        .getPaymentFormValues(this.customerId)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe((res: any) => {
          this.visitMain = res;
          this.buildamountForm();
        }),
        (err) => {
          err = err.error.message
            ? this.toastr.error(err.error.message)
            : this.toastr.error(
                "Error fetching default visit main form values."
              );
          this.spinner.hide();
        };
    }),
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error("Error fetching param value.");
        this.spinner.hide();
      };
  } */

  fetchPaymentForm() {
    this.spinner.show();
    console.log(this.modalData);
    // let customerId = this.modalData?.customerDetails?.customerId;

    let visitDetailId = null;

    this.visitDetailService
      .getAmountFormValuesForEdit(this.modalData.visitMainId)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((res: any) => {
        this.payment = res.form;
        this.payTypeLists = res.payTypeList;
        this.buildamountForm();
      }),
      (err) => {
        err = err.error.message
          // ? this.toastr.error(err.error.message)
          ? this.toastr.error("Payment saved successfully.")
          : this.toastr.error("Error fetching  visit main form values.");
        this.spinner.hide();
      };
  }
  /*  get payTypeList() {
    return payTypeList
  } */
  onCancel() {
    this.dialogRef.close("cancel");
  }

  onSave() {
    this.spinner.show();

    console.log(this.amountForm.value);
    if (this.amountForm.valid) {
      if (this.dateOfTransaction !== undefined) {
        let dateOfTransaction = this.customDate.getStringFromDatePicker(
          this.dateOfTransaction
        );
        this.amountForm.controls["date"].setValue(dateOfTransaction);
        this.dateOfTransaction = this.convetStringToDate(dateOfTransaction);
      }

      this.loading = true;
      this.visitDetailService
        .saveAmountForm(this.amountForm.value)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe(
          (res: any) => {
            this.loading = false;
            this.dialogRef.close(res);
            this.toastr.success(res.message);
          },
          (err) => {
            this.loading = false;
            err.error.message === err.error.message
              ? this.toastr.error(err.error.message)
              : this.toastr.error("Error  saving visit details.");
          }
        );
    } else {
      this.spinner.hide();
      return;
    }
  }

  compareFn(optionOne: any, optionTwo: any): boolean {
    return optionOne?.id === optionTwo?.id;
  }

  convetStringToDate(date) {
    return this.customDate.getDatePickerObject(date);
  }

  getCurrentDate() {
    let dateOfTransaction = this.customDate.getCurrentDateBS();
    return (this.dateOfTransaction = this.convetStringToDate(
      dateOfTransaction
    ));
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
