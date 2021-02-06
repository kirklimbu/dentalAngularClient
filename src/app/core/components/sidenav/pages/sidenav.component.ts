import { AfterViewInit, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { NavItems } from "src/app/core/models/nav-items";
import { SidenavService } from "../services/sidenav.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit, AfterViewInit {
  /* props */

  isBill: boolean;
  isSMS: boolean;
  @ViewChild("drawer", { static: true }) sidenav: MatSidenav;

  navItems: NavItems[] = [
    {
      displayName: "Dashboard",
      iconName: "dashboard",
      route: "/dental/home",
    },
    {
      displayName: "Customer",
      iconName: "person",
      route: "/dental/customer",
    },
    {
      displayName: "SMS",
      iconName: "sms",
      children: [
        {
          displayName: "Visit Type",
          iconName: "sms",
          route: "/dental/sms",
        },
        {
          displayName: "Day",
          iconName: "sms",
          route: "/dental/sms",
        },
      ],
    },
  ];
  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
  ngAfterViewInit() {
    this.sidenavService.sidenav = this.sidenav;
  }
}
