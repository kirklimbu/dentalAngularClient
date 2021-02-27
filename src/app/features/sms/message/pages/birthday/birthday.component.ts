import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { CustomJs } from "src/app/shared/customjs/custom.js";
import { SmsService } from "../../../service/sms.service";
import { MessageComponent } from "../message/message.component";

@Component({
  selector: "app-birthday",
  templateUrl: "./birthday.component.html",
  styleUrls: ["./birthday.component.scss"],
})
export class BirthdayComponent implements OnInit {
  /* props */

  displayedColumns: string[] = [
    "checked",
    "S.n",
    "id",
    "name",
    "address",
    "mobile",
    // "visitType",
    "visitDate",
    // "action",
  ];

  /* multiple checkbox */
  selection = new SelectionModel<any>(true, []);

  customerListTableDataSource; // for pagination or select all
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subscriptions: Subscription[] = [];

  constructor(
    private smsService: SmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchBirthdayList();
  }

  fetchBirthdayList() {
    this.spinner.show();
    this.customerListTableDataSource = [];

    this.smsService
      .getBirthdaySmsList("birthday")
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((res: any) => {
        this.customerListTableDataSource = new MatTableDataSource<any>(res);
        this.customerListTableDataSource.paginator = this.paginator;
      }),
      (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      };
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.customerListTableDataSource?.data?.length;
    return numSelected === numRows;
  }

  selectAllClients() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.customerListTableDataSource?.data.forEach((row) =>
          this.selection.select(row)
        );
  }
  clearSelectedClientsList() {
    this.selection.clear();
  }

  sendSms() {
    let selectedClients = [];
    this.selection.selected.forEach((s) => selectedClients.push(s.id));

    const dialogRef = this.dialog.open(MessageComponent, {
      disableClose: true,
      width: "600px",
      data: {
        // mode: mode,
        clientList: selectedClients,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result !== "cancel") {
        this.customerListTableDataSource = [];
        this.clearSelectedClientsList();
        this.fetchBirthdayList();
        this.toastr.success('SMS sent successfully.')

      }
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
