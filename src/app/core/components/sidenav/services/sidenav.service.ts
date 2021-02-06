import { ViewChild } from "@angular/core";
import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  public sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle() {
    console.log(this.sidenav);

    this.sidenav.toggle();
    // this.drawer.toggle()
  }
}
