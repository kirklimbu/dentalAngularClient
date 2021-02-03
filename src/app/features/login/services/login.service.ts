import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { User } from "src/app/core/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  // backend api
  API_URL = environment.apiUrl;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // user gareko xuina

  //props
  error: any;
  loading = false;
  constructor(private http: HttpClient, private router: Router) {}

  getLogin(userName, passWord): any {
    /* return this.http
      .post<User>(`${this.API_URL}staff/login`, { username, password })
      .pipe(
        map((res) => {
          console.log(res + "login response");

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("token", res.token);
          localStorage.setItem(
            "ServiceKey",
            "kdu9i4jndc9o#dsjd%fdj*df(adf@ksdjf)djfj/lkjdf"
          );
        })
      ); */

    return this.http
      .post<User>(this.API_URL + "staff/login", {
        userName,
        passWord,
      })
      .pipe(
        map((res) => {
          let data: any = res;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("token", data.token);
          localStorage.setItem("orgName", data.organization.name);
          this.loggedIn.next(true);
          localStorage.setItem("loggedIn", "true");
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIn");
    this.loggedIn.next(false);
    // this.userSubject.next(null);
    this.router.navigate(["/login"]);
  }
}
