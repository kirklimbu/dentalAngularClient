import { LoginService } from "./../../../features/login/services/login.service";
import { SidenavService } from "./../sidenav/services/sidenav.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  /* props */
  toggleActive: boolean = false;
  title: string; // for navBar title
  constructor(
    /* this value toggles our sidenav html=> sidenav.toggle() */
    public sidenav: SidenavService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.title = localStorage.getItem("orgName");
  }
  onChangeIcon() {
    this.toggleActive = !this.toggleActive;
  }

  onLogout() {
    this.loginService.logout();
  }
}
