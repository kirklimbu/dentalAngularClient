import { MessageComponent } from "./../message/pages/message/message.component";
import { SmsService } from "./../service/sms.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";

import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-sms-form",
  templateUrl: "./sms-form.component.html",
  styleUrls: ["./sms-form.component.scss"],
})
export class SmsFormComponent implements OnInit {
  /* props */
  clientListTable: any[] = [];
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

  selectedClients = [];
  selectAll = false;
  selection = new SelectionModel<any>(true, []);
  birthdaySmsList = [];
  nextDaySmsList = [];
  visitYtypeSmsList = [];

  smsType: string;
  status = "Visit Type";
  type = "number";
  placeholder = "Enter days";
  inputName = "Days";

  customerListTableDataSource; // for pagination or select all
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private smsService: SmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.fetchQueryParm();
  }

  fetchQueryParm() {
    // this.spinner.show();
    this.route.queryParamMap.subscribe((params) => {
      console.log(params);
      this.smsType = params.get("smsType");
      this.onSearch(this.smsType);

      if (this.smsType == "birthday") {
      }
    });
  }

  onSearch(e) {
    this.spinner.show();
    if (this.smsType == "nextDay") {
      this.customerListTableDataSource = [];
      console.log(this.customerListTableDataSource);
      let type = "nextXDay";
      let nextDay = e.days || 0;
      this.smsService
        .getCustomSmsListAferXdays(type, nextDay)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe((res: any) => {
          console.log(res);
          this.customerListTableDataSource = new MatTableDataSource<any>(res);
          this.customerListTableDataSource.paginator = this.paginator;
        }),
        (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        };
    } else if (this.smsType == "visitType") {
      this.customerListTableDataSource = [];
      let visitTypeId = e.status || 0;
      let fromDate = e.fromDate || "";
      let toDate = e.toDate || "";
      this.smsService
        .getSmsListByVisitType(this.smsType, visitTypeId, fromDate, toDate)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe((res: any) => {
          this.customerListTableDataSource = new MatTableDataSource<any>(res);
          this.customerListTableDataSource.paginator = this.paginator;
        }),
        (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        };
    } else {
      this.customerListTableDataSource = [];
      this.smsService
        .getBirthdaySmsList(this.smsType)
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
  }

  updateCheckedList(e) {}

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
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.UserId + 1
    }`;
  }

  sendSms() {
    this.selection.selected.forEach((s) => this.selectedClients.push(s.id));
    let selectedClients = this.selection.selected;

    const dialogRef = this.dialog.open(MessageComponent, {
      disableClose: true,
      width: "600px",
      data: {
        clientList: selectedClients,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      /* CALL BACKEND TO SAVE MESSAGE */
      // table refresh on cancel nagarne
      //if response is not list -->  refreshing particular segment
      if (result !== "cancel") {
        // this.fetchClientList();
      }
    });
  }
}
