import { AfterViewInit, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Router } from "@angular/router";
import {
  MultilevelMenuService,
  MultilevelNodes,
} from "ng-material-multilevel-menu";
import { SidenavService } from "../services/sidenav.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  /* props */

  isBill: boolean;
  isSMS: boolean;
  menuWithID: MultilevelNodes[] = null;

  @ViewChild("drawer", { static: true }) sidenav: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private router: Router
  ) // private multilevelMenuService: MultilevelMenuService
  {}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  navigateTo(smsType: string) {
    this.router.navigate(["/dental/sms"], {
      queryParams: { smsType: smsType },
    });
  }
}
