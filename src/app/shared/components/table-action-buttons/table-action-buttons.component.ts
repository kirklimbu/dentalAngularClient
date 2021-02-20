import { Component, OnInit } from "@angular/core";
import { EventEmitter, Output } from "@angular/core";
import { Input } from "@angular/core";
@Component({
  selector: "app-table-action-buttons",
  templateUrl: "./table-action-buttons.component.html",
  styleUrls: ["./table-action-buttons.component.scss"],
})
export class TableActionButtonsComponent implements OnInit {
  // props
  @Input()
  enableEdit = true;

  @Input()
  enableDelete = true;

  @Input()
  enablePrint = false;

  @Input()
  enableViewDetails = true;

  @Input()
  isEmpty = true;

  @Output()
  edit: EventEmitter<void> = new EventEmitter();

  @Output()
  delete: EventEmitter<void> = new EventEmitter();
  
  @Output()
  print: EventEmitter<void> = new EventEmitter();

  @Output()
  viewDetails: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit();
  }
  onDelete() {
    this.delete.emit();
  }
  onPrint() {
    this.print.emit();
  }
  onVerifyDetails() {
    this.viewDetails.emit();
  }
}
