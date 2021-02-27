import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs/operators";
import { SmsService } from "../../../service/sms.service";
import { MessageComponent } from "../message/message.component";

@Component({
  selector: "app-next-day",
  templateUrl: "./next-day.component.html",
  styleUrls: ["./next-day.component.scss"],
})
export class NextDayComponent implements OnInit {
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

  /* for multi checkbox */
  selection = new SelectionModel<any>(true, []);

  type = "number";
  placeholder = "Enter days";
  inputName = "Days";

  customerListTableDataSource; // for pagination or select all
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private smsService: SmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

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

  onSearch(e) {
    this.spinner.show();
    this.customerListTableDataSource = [];
    this.smsService
      .getCustomSmsListAferXdays("nextXDay", e.days)
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

  sendSms() {
    let selectedClients = [];
    this.selection.selected.forEach((s) => selectedClients.push(s.id));

    const dialogRef = this.dialog.open(MessageComponent, {
      disableClose: true,
      width: "600px",
      data: {
        clientList: selectedClients,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result !== "cancel") {
        this.customerListTableDataSource = [];
        this.clearSelectedClientsList();
        this.toastr.success("SMS sent successfully."); // message may change
      }
    });
  }
}
