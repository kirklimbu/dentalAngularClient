import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  // props
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCustomerForm() {
    return this.http.get(`${this.API_URL}auth/customer/form`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  getCustomerDetail(id?: number) {
    return this.http.get(`${this.API_URL}auth/customer/form?id=${id}`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getCustomerList() {
    return this.http.get(`${this.API_URL}auth/customer/list`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
  createCustomer(customer) {
    return this.http
      .post(`${this.API_URL}auth/customer/save`, { ...customer })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
