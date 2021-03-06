import { LoginService } from "./../../../features/login/services/login.service";
import { SidenavService } from "./../sidenav/services/sidenav.service";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  /* props */
  toggleActive: boolean = false;
  title: string; // for navBar title
  customerName: string;
  visitType: string;
  constructor(
    /* this value toggles our sidenav html=> sidenav.toggle() */
    public sidenav: SidenavService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title = localStorage.getItem("orgName");
    this.fetchCustomerName();
  }

  fetchCustomerName() {
    this.route.queryParamMap.subscribe((params) => {
      this.customerName = params.get("customerName");
      this.visitType = params.get("type");
    });
  }
  onChangeIcon() {
    this.toggleActive = !this.toggleActive;
  }

  onLogout() {
    this.loginService.logout();
  }
}
function Inuput() {
  throw new Error("Function not implemented.");
}
