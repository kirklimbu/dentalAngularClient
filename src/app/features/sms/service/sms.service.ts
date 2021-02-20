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
  getCustomSmsList(visitTypeId: number, type?: string, nextDay?: number) {
    return this.http
      .get(
        `${this.API_URL}auth/customer/sms/list?visitTypeId=${visitTypeId}&type=${type}&nextDay=${nextDay}`
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
