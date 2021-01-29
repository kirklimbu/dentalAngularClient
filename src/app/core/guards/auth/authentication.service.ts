import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      this.loggedIn.next(true);
      return !this.jwtHelper.isTokenExpired(token);
    } else return false;
  }
}
