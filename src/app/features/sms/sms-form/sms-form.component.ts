import { MessageComponent } from "./../message/pages/message/message.component";
import { PopupModalComponent } from "./../../../shared/components/popup-modal/popup-modal.component";
import { SmsService } from "./../service/sms.service";
import { CustomJs } from "src/app/shared/customjs/custom.js";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialog,
  MatOption,
  MatPaginator,
  MatTableDataSource,
} from "@angular/material";
import { DateFormatter } from "angular-nepali-datepicker";
import { Observable } from "rxjs";
import { Customer } from "src/app/core/models/customer";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { finalize, tap } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-sms-form",
  templateUrl: "./sms-form.component.html",
  styleUrls: ["./sms-form.component.scss"],
})
export class SmsFormComponent implements OnInit {
  /* props */
  smsForm: FormGroup;
  formatDate = new FormData();
  customDate = new CustomJs();

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

  smsType: string;
  status = "Visit Type";
  type = "number";
  placeholder = "Enter days";
  inputName = "Days";

  fromDate: any;
  toDate: any;
  customerListTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private smsService: SmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchQueryParm();
  }

  fetchQueryParm() {
    // this.spinner.show();
    this.route.queryParamMap.subscribe((params) => {
      console.log(params);
      this.smsType = params.get("smsType");
      

      if (this.smsType == "birthday") {
        this.onSearch(this.smsType);
      }
    });
  }

  onFilter() {}

  onSearch(e) {
    // console.log(e);
    this.spinner.show();
    if (this.smsType == "nextDay") {
      console.log("next day vitra");

      this.customerListTableDataSource = [];
      console.log("next day");
      let type = "nextXDay";
      let nextDay = e.days || 0;
      let visitTypeId = null;
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
      console.log("visti type vitra");
      this.customerListTableDataSource = [];
      let visitTypeId = e.status || 0;
      let fromDate = e.fromDate || "";
      let toDate = e.toDate || "";
      this.smsService
        .getSmsListByVisitType(this.smsType, visitTypeId, fromDate, toDate)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe((res: any) => {
          // console.log(res);
          this.customerListTableDataSource = new MatTableDataSource<any>(res);
          this.customerListTableDataSource.paginator = this.paginator;
        }),
        (err) => {
          this.toastr.error(err.message);
          this.spinner.hide();
        };
    } else {
      console.log("birthday vitrra");

      this.customerListTableDataSource = [];

      this.smsService
        .getBirthdaySmsList(this.smsType)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe((res: any) => {
          // console.log(res);
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
    // console.log(numSelected);
    // console.log(this.customerListTableDataSource);

    const numRows = this.customerListTableDataSource?.data?.length;
    // console.log(numRows);
    // console.log(numSelected === numRows);
    return numSelected === numRows;
  }

  selectAllClients() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.customerListTableDataSource.data.forEach((row) =>
          this.selection.select(row)
        );
  }

 /*  logSelection() {
    this.selection.selected.forEach((s) => console.log(s.name));
  } */

  sendSms() {
    this.selection.selected.forEach((s) => this.selectedClients.push(s.id));
    console.log(this.selectedClients);

    const dialogRef = this.dialog.open(MessageComponent, {
      disableClose: true,
      width: "600px",
      data: {
        // mode: mode,
        clientList: this.selectedClients,
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

  onSave() {
    console.log("save clicek");
  }
}
