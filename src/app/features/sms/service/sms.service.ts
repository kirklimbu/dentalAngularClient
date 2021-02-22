import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SmsService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDefaultSmsList() {
    return this.http.get(`${this.API_URL}auth/customer/default/sms/list`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  getBirthdaySmsList(type: string) {
    return this.http
      .get(`${this.API_URL}auth/customer/sms/list?type=${type}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  getCustomSmsListAferXdays(type: string, nextDay: number) {
    return this.http
      .get(
        `${this.API_URL}auth/customer/sms/list?type=${type}&nextDay=${nextDay}`
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  getSmsListByVisitType(
    type: string,
    id: number,
    fromDate: string,
    toDate: string
  ) {
    return this.http
      .get(
        `${this.API_URL}auth/customer/sms/list?type=${type}&visitTypeId=${id}&fromDate=${fromDate}&toDate=${toDate}`
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
