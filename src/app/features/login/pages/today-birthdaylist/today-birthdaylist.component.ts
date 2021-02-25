import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-today-birthdaylist",
  templateUrl: "./today-birthdaylist.component.html",
  styleUrls: ["./today-birthdaylist.component.scss"],
})
export class TodayBirthdaylistComponent implements OnInit {
  displayedColumns: string[] = ["sn", "name"];
  dataSource = [];
  constructor(
    private loginService: LoginService,
    public dialogRef: MatDialogRef<TodayBirthdaylistComponent>
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
