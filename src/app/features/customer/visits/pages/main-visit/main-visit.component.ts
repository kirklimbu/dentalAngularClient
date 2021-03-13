import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";

import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { VisitService } from "../../services/visit.service";
import { VisitMainFormComponent } from "../../shared/visit-main-form/visit-main-form.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material";
import Swal from "sweetalert2";

@Component({
  selector: "app-main-visit",
  templateUrl: "./main-visit.component.html",
  styleUrls: ["./main-visit.component.scss"],
})
export class MainVisitComponent implements OnInit {
  /* props */
  customerId: number;
  customerName: string;
  visitMainId: number;
  mode = "add";

  visitListDataSource$: Observable<any>;
  visitListDataSource;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = [
    "Sn",
    // "customerId",
    "visitType",
    "totalCost",
    "remBal",
    "due",
    "action",
  ];
  visitListTable: any[] = [];

  customerVisitDetail;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private visitService: VisitService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<VisitMainFormComponent>,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchMainVisitList();
  }

  fetchMainVisitList() {
    this.spinner.show();
    this.route.queryParamMap.subscribe(
      (params) => {
        this.customerId = +params.get("customerId");
        this.customerName = params.get("customerName");

        this.visitService
          .getMainVisitList(this.customerId)
          .pipe(finalize(() => this.spinner.hide()))
          .subscribe((res: any) => {
            this.visitListDataSource = new MatTableDataSource<any>(res);
            this.visitListDataSource.paginator = this.paginator;
          });
      },
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error("Error fetching Visit list.");
        this.spinner.hide();
      }
    );
  }

  onViewDetails(visit) {
    console.log(visit);
    let type = visit.name;
    let id = visit.id;
    this.router.navigate(["/dental/client/visits/detail"], {
      queryParams: {
        customerName: this.customerName,
        type: type,
        visitMainId: id,
      },
    });
  }

  onAdd(mode: string, customer?) {
    /* START BY CODE REFACTORING FROM HERE */
    console.log(customer);
    const dialogRef = this.dialog.open(VisitMainFormComponent, {
      disableClose: true,
      // width: "450px",
      data: {
        mode: mode,
        customerDetails: customer,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      /* YESKO RESPONSE MA SERVER LE LIST PANI PATHAUXA TESLAI TABLE MA POPULATE GARNE */

      if (result !== "cancel") {
        this.fetchMainVisitList();
      }
    });
  }

  onClose(data) {
    console.log(data);
    // ask before closing the treatment
    Swal.fire({
      title: "Are you sure you want to end this treatment?",
      text: "You won't be able to revert this!",
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed == true) {
        this.visitService
          .closeMainVisit(data.id)
          .pipe(finalize(() => this.spinner.hide()))
          .subscribe(
            (res: any) => {
              console.log(res);
              this.toastr.success(res.message);
              this.fetchMainVisitList();
            },
            (err) => {
              this.toastr.error(err.message);
            }
          );
      }
    });
  }

  onSearch() {}

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
