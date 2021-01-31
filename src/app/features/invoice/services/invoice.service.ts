import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  /* props */
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}
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
