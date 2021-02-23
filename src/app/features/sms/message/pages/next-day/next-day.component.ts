import { MAT_DIALOG_DATA } from "@angular/material";
import { LoginService } from "./../../../../login/services/login.service";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-next-day",
  templateUrl: "./next-day.component.html",
  styleUrls: ["./next-day.component.scss"],
})
export class NextDayComponent implements OnInit {
  displayedColumns: string[] = ["sn", "name"];
  dataSource = [];
  constructor(
    private loginService: LoginService,
    public dialogRef: MatDialogRef<NextDayComponent>
  ) {}

  ngOnInit(): void {
    this.fetchBirthdayList();
  }

  fetchBirthdayList() {
    console.log(this.dataSource);

    this.dataSource = this.loginService.birthdayLists;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
