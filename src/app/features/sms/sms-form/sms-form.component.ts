import { MessageComponent } from "./../message/pages/message/message.component";
import { PopupModalComponent } from "./../../../shared/components/popup-modal/popup-modal.component";
import { SmsService } from "./../service/sms.service";
import { CustomJs } from "src/app/shared/customjs/custom.js";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatOption, MatTableDataSource } from "@angular/material";
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
  clientListDataSource$: Observable<any>;
  formatDate = new FormData();
  customDate = new CustomJs();
  fromDate: any;
  fromDate2: any;
  toDate: any;
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
    "action",
  ];

  /* displaying nepali date */
  /* fromDateFormatter: DateFormatter = (date) => {
     return this.formatDate.getFormatDate(date);
   };
   toDateFormatter: DateFormatter = (date) => {
     return this.formatDate.getFormatDate(date);
   }; */

  clientListDataSource: Customer[];
  selectedClients = [];
  selectAll = false;
  selection = new SelectionModel<any>(true, []);

  smsType: string;
  status = "Visit Type";
  type = "number";
  placeholder = "Enter days";
  inputName = "Days";

  // @ViewChild("selectAll") private selectAll: MatOption;

  /* fake customerlist */
  clientList: any[] = [
    {
      id: 5,
      name: "yemjee",
      mobile: "98767676788",
      address: "damak",
      visitDateBs: "2077/10/10",
      photo: null,
      sms: true,
    },
    {
      id: 6,
      name: "Bickram Sambahamphe",
      mobile: "123456",
      address: "damak",
      visitDateBs: "2077/10/17",
      photo: null,
      sms: true,
    },
    {
      id: 36,
      name: "sujan",
      mobile: "789454",
      address: "damak",
      visitDateBs: "",
      photo: null,
      sms: false,
    },
  ];
  /* fake customerlist end*/
  customerListTableDataSource = new MatTableDataSource(this.clientList);

  constructor(
    private smsService: SmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.fetchClientList();
    this.fetchQueryParm();
  }

  fetchQueryParm() {
    // this.spinner.show();
    this.route.queryParamMap.subscribe((params) => {
      console.log(params);
      this.smsType = params.get("smsType");
    });
  }
  fetchClientList() {
    this.spinner.show();
    this.clientListDataSource$ = this.smsService
      .getSmsList()
      .pipe(finalize(() => this.spinner.hide()))
      .pipe(
        tap((res) => {
          this.clientListDataSource = res;
        })
      );
    (err) => {
      this.toastr.error(err.message);
      this.spinner.hide();
    };
  }

  onSearch(e) {
    console.log(e);
  }

  updateCheckedList(e) {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.customerListTableDataSource.data.length;
    return numSelected === numRows;
  }
  selectAllClients() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.customerListTableDataSource.data.forEach((row) =>
          this.selection.select(row)
        );
  }
  logSelection() {
    this.selection.selected.forEach((s) => console.log(s.name));
  }

  sendSms() {
    /* SEND SELECTED CLEINT LIST TO MODAL */
    let clientList = this.selection.selected.forEach((s) => s);

    const dialogRef = this.dialog.open(MessageComponent, {
      disableClose: true,
      width: "600px",
      data: {
        // mode: mode,
        clientList: clientList,
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
