import { Subscription } from "rxjs";
import { CustomJs } from "src/app/shared/customjs/custom.js";
import { FormatDate } from "../../../../core/constants/format-date";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { DateFormatter } from "angular-nepali-datepicker";
import { Customer } from "src/app/core/models/customer";
import { ClientService } from "../../services/client.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"],
})
export class CustomerFormComponent implements OnInit, OnDestroy {
  /* props */
  customerForm: FormGroup;
  client: Customer = new Customer();
  visitDateBs: string;
  dob: string;
  regDate: string;
  mode = "add";
  customerId: number;
  formSubmitted = false;
  isItToday: boolean;
  sendSMS = false;
  loading: boolean;
  enableSaveForm = false;
  hideRegDate = false;
  formatDate = new FormatDate();
  customDate = new CustomJs();

  dobDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };
  regDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) {}

  ngOnInit() {
    this.mode = this.modalData.mode;
    this.mode === "edit" ? this.fetchCustomerDetails() : this.fetchFormValues();
    this.buildCustomerForm();
  }

  fetchFormValues() {
    this.spinner.show();
    this.clientService
      .getCustomerForm()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res: Customer) => {
          this.isItToday = res.today;
        },
        (err) => {
          this.toastr.error(err.message);
          this.onCancel();
        }
      );
  }

  fetchCustomerDetails() {
    this.spinner.show();
    this.customerId = this.modalData.customerDetails.id;
    this.clientService
      .getCustomerDetail(this.customerId)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res: any) => {
          this.mode = "edit";
          this.client = res;
          console.log(this.client.dob);
          this.dob = this.customDate.getDatePickerObject(this.client.dob);
          this.regDate = this.customDate.getDatePickerObject(
            this.client.regDateBs
          );
          this.buildCustomerForm();
        },
        (err) => {
          err.error.message === err.error.message
            ? this.toastr.error(err.error.message)
            : this.toastr.error("Error fetching customer details.");
          this.spinner.hide();
        }
      );
  }

  buildCustomerForm() {
    if (this.mode === "add") {
      this.customerForm = this.formBuilder.group({
        customerId: [],
        name: [this.client.name],
        mobile: [this.client.mobile, [Validators.pattern("[9][0-9]{9}$")]],
        address: [this.client.address],
        dob: [this.client.dob],
        today: [this.client.today],
        // sendSMS: [this.client.sendSMS],
        regDateBs: [this.client.regDateBs],
        email: [this.client.email, [Validators.email]],
        /*  visitType: [this.client.visitType],
        visitDateBs: [this.client.visitDateBs], */
      });
    } else {
      this.customerForm = this.formBuilder.group({
        id: [this.client.id],
        name: [this.client.name],
        mobile: [this.client.mobile],
        address: [this.client.address],
        dob: [this.client.dob],
        today: [this.client.today],
        // sendSMS: [this.client.sendSMS],

        regDateBs: [this.client.regDateBs],
        email: [this.client.email],
      });
    }
  }

  onCancel() {
    /* send a string when dialog closes */
    this.dialogRef.close("cancel");
  }

  onSave() {
    if (this.customerForm.valid) {
      if (this.dob !== undefined) {
        let dob = this.customDate.getStringFromDatePicker(this.dob);
        this.customerForm.controls["dob"].setValue(dob);
        this.dob = this.convetStringToDate(dob);
      }

      if (this.isItToday !== true) {
        let regDate = this.customDate.getStringFromDatePicker(this.regDate);
        this.customerForm.controls["regDateBs"].setValue(regDate);
        this.regDate = this.convetStringToDate(regDate);
      } else {
        this.customerForm.controls["regDateBs"].reset();
      }
      this.spinner.show();
      console.log(this.customerForm.value);

      this.loading = true;
      this.clientService

        .createCustomer(this.customerForm.value, this.sendSMS)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe(
          (res: any) => {
            this.loading = false;
            this.dialogRef.close(res);
            this.toastr.success(res.message);
          },
          (err) => {
            err.error.message === err.error.message
              ? this.toastr.error(err.error.message)
              : this.toastr.error("Error  saving customer details.");
            this.loading = false;
          }
        );
    } else {
      this.spinner.hide();
      this.toastr.error("Please fill all fields before submitting the form.");
      return;
    }
  }

  convetStringToDate(date) {
    return this.customDate.getDatePickerObject(date);
  }

  onDayCheck(e) {
    this.isItToday = e.checked;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
