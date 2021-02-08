import { FormatDate } from "./../../../core/constants/format-date";
import { CustomJs } from "src/app/shared/customjs/custom.js";
import { NgxSpinnerService } from "ngx-spinner";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DateFormatter, NepaliDate } from "angular-nepali-datepicker";

@Component({
  selector: "app-table-top-bar",
  templateUrl: "./table-top-bar.component.html",
  styleUrls: ["./table-top-bar.component.scss"],
})
export class TableTopBarComponent implements OnInit {
  /* props */
  statuses: any[] = [
    {
      name: "Pending",
    },
  ];
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
  inputValue: any = 0;

  @Input()
  fromDate: any;

  @Input()
  toDate: any;

  @Input()
  status: string;

  @Input()
  optionType: string = "Status";

  keyword: string;

  @Output()
  add: EventEmitter<void> = new EventEmitter();

  @Output()
  search = new EventEmitter<{
    inputValue?: any;
    status?: any;
    fromDate?: any;
    toDate?: any;
  }>();

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  fromDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };
  toDateFormatter: DateFormatter = (date) => {
    return `${date.year} / ${date.month + 1} / ${date.day} `;
  };

  onAdd() {
    console.log("add click emitted");

    this.add.emit();
  }

  onSearch() {
    this.search.emit({
      inputValue: this.inputValue,
      status: this.status,
      fromDate: this.fromDate,
      toDate: this.toDate,
    });

    console.log(this.inputValue);
    console.log(this.status);
    console.log(this.fromDate);
    console.log(this.toDate);
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
    return;
  }
}
