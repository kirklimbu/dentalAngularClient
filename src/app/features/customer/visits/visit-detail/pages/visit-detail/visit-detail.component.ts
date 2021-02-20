import { VisitDetailFormComponent } from "./../../shared/visit-detail-form/visit-detail-form.component";
import { VisitDetailService } from "./../../services/visit-detail.service";
import { Observable, Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { MatDialogRef, MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { finalize, tap } from "rxjs/operators";
import { VisitMainFormComponent } from "../../../shared/visit-main-form/visit-main-form.component";

@Component({
  selector: "app-visit-detail",
  templateUrl: "./visit-detail.component.html",
  styleUrls: ["./visit-detail.component.scss"],
})
export class VisitDetailComponent implements OnInit {
  /* props */
  visitDetailListDataSource$: Observable<any>;
  visitDetailListDataSource: [] = [];
  displayedColumns: string[] = [
    "S.n",
    "customerId",
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
    this.route.queryParamMap.subscribe((params) => {
      this.visitMainId = +params.get("visitMainId");
      // this.visitType = params.get("type");
      let type = "pay";

      this.visitDetailListDataSource$ = this.visitDetailService
        .getVisitDetailList(type, this.visitMainId)
        .pipe(finalize(() => this.spinner.hide()))
        .pipe(
          tap((res) => {
            this.customerVisitDetail = res;
          })
        );
    }),
      (err) => {
        err = err.error.message
          ? this.toastr.error(err.error.message)
          : this.toastr.error("Error fetching param value.");
        this.spinner.hide();
      };
  }
  onSearch() {}

  onPrint(visit) {
    this.router.navigate(["/dental/invoice"], {
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

  /* ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
} */
}
