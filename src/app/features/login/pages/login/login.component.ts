import { NextDayComponent } from "./../../../sms/message/pages/next-day/next-day.component";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { User } from "src/app/core/models/user.model";
import { LoginService } from "../../services/login.service";
import { MatDialog } from "@angular/material";
import { TodayBirthdaylistComponent } from "src/app/features/login/pages/today-birthdaylist/today-birthdaylist.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  // props
  hide = true;
  formSubmitted = false;
  loginForm: FormGroup;
  user: User = new User();
  errorMsg: string;
  loading = false;
  logo: File | null;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  birthdayList = [];
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.routeChange();
    this.buildForm();
    this.fetchBirthdayList();
  }

  routeChange() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      /* if (!this.jwtHelper.isTokenExpired(token)) {
                this.router.navigateByUrl('/customer/customerlist');
            } */
      this.router.navigate["/dental/home"];
    }
  }

  buildForm() {
    this.loginForm = this.fb.group({
      userName: [this.user.username, [Validators.required]],
      passWord: [this.user.password, [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // Msg
  getUsernameErrorMsg() {
    return this.loginForm.controls.userName.hasError("required")
      ? "Username is required."
      : "";
  }
  getPassErrorMsg() {
    return this.loginForm.controls.passWord.hasError("required")
      ? "Password is required."
      : "";
  }

  onLogin() {
    this.formSubmitted = true;
    this.loading = true;
    if (this.loginForm.valid && this.formSubmitted) {
      this.loginService
        .getLogin(this.f.userName.value, this.f.passWord.value)
        .subscribe(
          (res) => {
            console.log(res);

            this.loading = false;
            this.loggedIn.next(true);
            this.router.navigate(["/dental/home"]);
            this.openBirthdayModal();
          },
          (err) => {
            err.status == 400
              ? (this.errorMsg = err.error.message || err.error.errors[0])
              : (this.errorMsg = "Login Failed");
            this.loading = false;
          }
        );
    }
  }

  fetchBirthdayList() {
    this.birthdayList = this.loginService.birthdayLists;
  }

  openBirthdayModal() {
    const dialogRef = this.dialog.open(TodayBirthdaylistComponent, {
      disableClose: true,
      width: "450px",
      height: "500px",
      // backdropClass: 'backdropBackground',
      data: {
        birthdayList: this.birthdayList,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
     
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
