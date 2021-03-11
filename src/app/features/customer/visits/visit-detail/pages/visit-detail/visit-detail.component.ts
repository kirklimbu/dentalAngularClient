import { VisitDetailFormComponent } from "./../../shared/visit-detail-form/visit-detail-form.component";
import { VisitDetailService } from "./../../services/visit-detail.service";
import { Observable, Subscription } from "rxjs";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DatePipe } from "@angular/common";
import {
  MatDialogRef,
  MatDialog,
  MatTableDataSource,
  MatPaginator,
} from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { finalize, tap } from "rxjs/operators";
import { VisitMainFormComponent } from "../../../shared/visit-main-form/visit-main-form.component";
import { AmountFormComponent } from "../../shared/amount-form/amount-form.component";

@Component({
  selector: "app-visit-detail",
  templateUrl: "./visit-detail.component.html",
  styleUrls: ["./visit-detail.component.scss"],
})
export class VisitDetailComponent implements OnInit {
  /* props */
  visitDetailListDataSource$: Observable<any>;
  visitDetailListDataSource;
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = [
    "S.n",
    // "customerId",
    "visitDateBs",
    "doctor",
    "nextVisitDateBs",
    "visitAfterDay",
    "action",
  ];

  visitMainId: number;
  visitType: string;
  label1 = "Visit";
  label2 = "Deposit";
  customerVisitDetail;

  subscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private visitDetailService: VisitDetailService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<VisitMainFormComponent>,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.fetchVisitDetailList();

  }

  fetchVisitDetailList() {
    this.spinner.show();
    // this.visitMainId = +this.route.snapshot.queryParamMap.get("visitMainId");

    this.route.queryParamMap.subscribe((params) => {
      this.visitMainId = +params.get("visitMainId");
      let type = "pay";

      this.visitDetailService
        .getVisitDetailList(type, this.visitMainId)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe(
          (res: any) => {
            this.visitDetailListDataSource = new MatTableDataSource<any>(res);
            this.visitDetailListDataSource.paginator = this.paginator;
          },
          (err) => {
            err = err.error.message
              ? this.toastr.error(err.error.message)
              : this.toastr.error("Error fetching Visit Detail list.");
            this.spinner.hide();
          }
        );
    });
  }
  onSearch() {}

  onPrint(visit) {
    this.router.navigate(["/dental/customer/invoice"], {
      queryParams: { visitMainId: this.visitMainId, visitDetailId: visit.id },
    });
  }

  onAdd(mode: string, visitDetail?: any) {
    /* START BY CODE REFACTORING FROM HERE */
    const dialogRef = this.dialog.open(VisitDetailFormComponent, {
      disableClose: true,
      // width: "450px",

      data: {
        mode: mode,
        visitDetails: visitDetail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== "cancel") {
        this.fetchVisitDetailList();
      }
    });
  }
  onAddAmount(mode: string, visitDetail?: any) {
    /* START BY CODE REFACTORING FROM HERE */
    const dialogRef = this.dialog.open(AmountFormComponent, {
      disableClose: true,
      // width: "450px",

      data: {
        mode: mode,
        visitMainId: this.visitMainId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== "cancel") {
        this.fetchVisitDetailList();
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
