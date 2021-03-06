import { Router } from "@angular/router";
import { Customer } from "src/app/core/models/customer";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { ClientService } from "../../services/client.service";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { FormatDate } from "src/app/core/constants/format-date";
// project
import { CustomJs } from "src/app/shared/customjs/custom.js";
import { DateFormatter } from "angular-nepali-datepicker";
import { MatDialog, MatPaginator } from "@angular/material";
import { CustomerFormComponent } from "../../shared/customer-form/customer-form.component";

@Component({
  selector: "app-client",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  /* props */
  formatDate = new FormatDate();
  customDate = new CustomJs();
  fromDate: any;
  toDate: any;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = [
    "S.n",
    "id",
    "name",
    "address",
    "mobile",
    // "visitType",
    "due",
    "visitDate",
    "action",
  ];
  customerListTableDataSource;
  /* displaying nepali date */
  fromDateFormatter: DateFormatter = (date) => {
    return this.formatDate.getFormatDate(date);
  };
  toDateFormatter: DateFormatter = (date) => {
    return this.formatDate.getFormatDate(date);
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /* fake data end */
  constructor(
    private clientService: ClientService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchClientList();
  }

  fetchClientList() {
    this.spinner.show();
    this.clientService
      .getCustomerList()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(
        (res: any) => {
          this.customerListTableDataSource = new MatTableDataSource<any>(res);
          this.customerListTableDataSource.paginator = this.paginator;
        },
        (err) => {
          err.error.message === err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error("Error fetching Customer list.");
        this.spinner.hide();
        }
      );
  }

  onSearch() {}

  onAdd(mode?: string, customer?: Customer) {
    // customform add api call garda error aayo vane customerform page nakholne
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      disableClose: true,
      // width: "450px",
      data: {
        mode: mode,
        customerDetails: customer,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== "cancel") {
        this.fetchClientList();
      }
    });
  }

  onViewDetails(customer: Customer) {
    let customerName = customer.name;
    this.router.navigate(["/dental/customer/visits"], {
      queryParams: { customerId: customer.id, customerName: customerName },
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
