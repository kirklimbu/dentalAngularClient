import { SharedServiceService } from "./../../serviecs/shared-service.service";
import { FormatDate } from "./../../../core/constants/format-date";
import { CustomJs } from "src/app/shared/customjs/custom.js";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DateFormatter, NepaliDate } from "angular-nepali-datepicker";
import { from, Observable } from "rxjs";

@Component({
  selector: "app-table-top-bar",
  templateUrl: "./table-top-bar.component.html",
  styleUrls: ["./table-top-bar.component.scss"],
})
export class TableTopBarComponent implements OnInit {
  /* props */

  statuses$: Observable<any>;
  statuses;
  isSearchShowing = false;
  customDate = new CustomJs();
  formatDate = new FormatDate();

  /* input props */
  @Input()
  enableInput = false;
  @Input()
  placeholder: string = "Enter Days";
  @Input()
  type: string = "number"; //type of input
  @Input()
  inputName: string;

  @Input()
  enableSearch = false;

  @Input()
  enableAdd = true;

  @Input()
  enableStatus = true;

  @Input()
  enableFromDate = true;

  @Input()
  enableToDate = true;

  @Input()
  days: any;

  @Input()
  birthday: any;

  @Input()
  fromDate: any;

  @Input()
  toDate: any;

  @Input()
  status: string;

  @Input()
  optionType: string = "";

  keyword: string;

  @Output()
  add: EventEmitter<void> = new EventEmitter();

  @Output()
  search = new EventEmitter<{
    days?: any;
    birthday?: any;
    status?: any;
    fromDate?: any;
    toDate?: any;
  }>();

  constructor(
    private spinner: NgxSpinnerService,
    private sharedService: SharedServiceService
  ) {}

  ngOnInit(): void {
    this.fetchVisitType();
    this.getCurrentDate();
    this.getDateAfter();
  }

  fromDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };
  toDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };

  onAdd() {
    this.add.emit();
  }

  onSearch() {
    console.log(this.status);
    if (this.status) {
      this.fromDate = this.convertDateToString(this.fromDate);
      this.toDate = this.convertDateToString(this.toDate);
    } else {
      this.fromDate = "";
      this.toDate = "";
    }

    this.search.emit({
      days: this.days,
      birthday: this.birthday,
      status: this.status,
      fromDate: this.fromDate,
      toDate: this.toDate,
    });

    if (this.status) {
      this.fromDate = this.convetStringToDate(this.fromDate);
      this.toDate = this.convetStringToDate(this.toDate);
    }
  }

  convertDateToString(date) {
    return this.customDate.getStringFromDatePicker(date);
  }

  convetStringToDate(date) {
    return this.customDate.getDatePickerObject(date);
  }

  getCurrentDate() {
    let fromDate = this.customDate.getCurrentDateBS();
    return (this.fromDate = this.convetStringToDate(fromDate));
  }

  getDateAfter() {
    let toDate = this.customDate.getBeforeAfterDayDateBs(7);
    return (this.toDate = this.convetStringToDate(toDate));
  }

  fetchDefaultList() {
    this.spinner.show();
    const status = "P";

    let toDate: NepaliDate = this.customDate.getCurrentDateBS();
    toDate = this.customDate.getDatePickerObject(toDate); // converting to object to display in Datepicker
    this.toDate = toDate; // assigning to Datepicker

    let fromDate: NepaliDate = this.customDate.getBeforeAfterMonthDateBS(-1);
    fromDate = this.customDate.getNepaliFunctionDateObject(fromDate);
    this.fromDate = fromDate;
  }

  fetchVisitType() {
    this.statuses$ = this.sharedService.getVisitType();
    console.log(this.statuses$);
    /* this.sharedService.getVisitType()
    .subscribe((res) => {
      this.statuses = res;
    }); */
    console.log(this.statuses);
  }
}
