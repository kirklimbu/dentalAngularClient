import { VisitType } from "./../../../../../core/models/visit-type.model";
import { VisitMain } from "./../../../../../core/models/visit-main.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { VisitService } from "../../services/visit.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-visit-main-form",
  templateUrl: "./visit-main-form.component.html",
  styleUrls: ["./visit-main-form.component.scss"],
})
export class VisitMainFormComponent implements OnInit, OnDestroy {
  /* props */

  visitMain = new VisitMain();
  visitMainForm: FormGroup;
  mode = "add";
  customerId: number;
  visitMainId: number;

  loading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<VisitMainFormComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) {}
  

  ngOnInit(): void {
    this.mode = this.modalData.mode; // for add

    this.mode === "add" ? this.fetchParamFromUrl() : this.fetchMainVisitForm();
    this.buildVisitMainForm();
  }

  buildVisitMainForm() {
    if (this.mode === "add") {
      this.visitMainForm = this.fb.group({
        customerId: [this.visitMain.customerId],
        name: [this.visitMain.name],
        remBal: [this.visitMain.remBal],
        totalCost: [this.visitMain.totalCost],
      });
    } else {
      this.visitMainForm = this.fb.group({
        id: [this.visitMain.id],
        customerId: [this.visitMain.customerId],
        remBal: [this.visitMain.remBal],
        totalCost: [this.visitMain.totalCost],
        name: [this.visitMain.name],
      });
    }
  }

  fetchParamFromUrl() {
    this.spinner.show();
    this.route.queryParamMap.subscribe((params) => {
      this.customerId = +params.get("customerId");
      this.visitService
        .getVisitMainFormValues(this.customerId)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe((res: any) => {
          this.visitMain = res;
          this.buildVisitMainForm();
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
  }

  fetchMainVisitForm() {
    this.spinner.show();

    let customerId = this.modalData?.customerDetails?.customerId;
    let visitMainId = this.modalData?.customerDetails?.id;
    this.visitService
      .getVisitMainFormValuesForEdit(customerId, visitMainId)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((res: any) => {
        this.visitMain = res;
        this.buildVisitMainForm();
      }),
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error("Error fetching  visit main form values.");
        this.spinner.hide();
      };
  }

  onCancel() {
    this.dialogRef.close("cancel");
  }

  onSave() {
    this.spinner.show();

    if (this.visitMainForm.valid) {
      this.loading = true;
      this.visitService
        .saveVisitMainForm(this.visitMainForm.value)
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
