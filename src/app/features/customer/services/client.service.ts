import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Customer } from "src/app/core/models/customer";
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
  createCustomer(customer:Customer, sms: boolean) {
    console.log(customer);
    return this.http
      .post(`${this.API_URL}auth/customer/save?sendSMS=${sms}`, { ...customer })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  // bill apis
  searchInvoices(status: any, fromDate: any, toDate: any) {
    console.log(status + " " + fromDate + " " + toDate);

    return this.http
      .get(
        `${this.API_URL}auth/letter/verify/list?status=${status}&fromDate=${fromDate}&toDate=${toDate}`
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  getInvoiceDetails(visitDetailId?: number, visitMainId?: number) {
    return this.http
      .get(
        `${this.API_URL}auth/customer/visit/detail/form?visitDetailId=${visitDetailId}&visitMainId=${visitMainId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
