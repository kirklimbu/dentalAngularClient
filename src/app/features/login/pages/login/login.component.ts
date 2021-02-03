import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { User } from "src/app/core/models/user.model";
import { LoginService } from "../../services/login.service";

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

  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.routeChange();
    this.buildForm();
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
            this.loading = false;
            this.loggedIn.next(true);
            this.router.navigate(["/dental/home"]);
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

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
