import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatDialog, MatTableDataSource } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SmsService } from "../../../service/sms.service";
import { MessageComponent } from "../message/message.component";
import { finalize } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-visit-type",
  templateUrl: "./visit-type.component.html",
  styleUrls: ["./visit-type.component.scss"],
})
export class VisitTypeComponent implements OnInit {
  /* props */
  optionType = "Visit Type";
  status = "";
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
  selectedClients = [];

  customerListTableDataSource; // for pagination or select all
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private smsService: SmsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {}

  onSearch(e) {
    this.spinner.show();
    this.customerListTableDataSource = [];

    let visitTypeId = e.status || 0;
    let fromDate = e.fromDate || "";
    let toDate = e.toDate || "";
    this.smsService
      .getSmsListByVisitType("visitType", visitTypeId, fromDate, toDate)
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
    // let selectedClients = [];
    this.selection.selected.forEach((s) => this.selectedClients.push(s.id));

    const dialogRef = this.dialog.open(MessageComponent, {
      disableClose: true,
      width: "600px",
      data: {
        clientList: this.selectedClients,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result !== "cancel") {
        console.log("sent msg");

        this.customerListTableDataSource = [];
        this.clearSelectedClientsList();
        this.reloadPage();
        this.toastr.success('SMS sent successfully.') //message may change
      } else {
        console.log("sent not msg");
      }
    });
  }

  private reloadPage() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
