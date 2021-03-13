import { NgxSpinnerComponent } from "./../../../../shared/components/ngx-spinner/ngx-spinner.component";
import { ToastrService } from "ngx-toastr";
import { HomeService } from "./../../services/home.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, Subscription } from "rxjs";
import { finalize, tap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  /* props */
  /* table */
  showTable = false;
  displayedColumns: string[] = ["sn", "name", "lastSms"];
  chartTable = [];

  /* chart */
  chart1Title = "";
  chart2Title = "";
  view: any[] = [400, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  legendTitle1 = "";
  legendTitle2 = "";
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel1 = "Patients";
  yAxisLabel2 = "New cusotmers";
  xAxisLabel1 = "";
  xAxisLabel2 = "";
  barPadding = 1;
  colorScheme = {
    // domain: ["#777", "#fca402", "#35a7e0", "#4c49d8", "#fa1000", "#2cb713"],
    domain: ["#7dce94", "#e62739", "#6ed3cf", "#f2b1d8", "#ffdc6a", "#2cb713"],
  };

  chartData: any[] = [];
  chart2Data: any[] = [];
  charts: string[] = ["Vertical Bar", "Pie Chart",
  // "Advance Pie Chart"
];
  // chartData$: Observable<any>;
  selectedChart: string;

  subscriptions: Subscription[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.onChooseChart("Vertical Bar");
  }

  onChooseChart(chart: string) {
    this.selectedChart = chart;
    this.fetchChartData();
  }

  fetchChartData() {
    this.spinner.show();
    this.homeService
      .getChartData()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((res: any) => {
        this.chartTable = res.smsCustomerList;
        this.chartData = res.topVisitList;
        this.chart2Data = res.newCustomerList;
      }),
      (err) => {
        this.toastr.error(err.message);
        this.spinner.hide();
      };
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
