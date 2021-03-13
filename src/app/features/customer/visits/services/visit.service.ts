import { VisitType } from "./../../../../core/models/visit-type.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VisitService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getMainVisitList(id?: number) {
    console.log("service list id" + id);

    return this.http
      .get(`${this.API_URL}auth/customer/visit/main/list?customerId=${id}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  getVisitMainFormValues(customerId?: number, visitMainId?: number) {
    return this.http
      .get(
        `${this.API_URL}auth/customer/visit/main/form?customerId=${customerId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  getVisitMainFormValuesForEdit(customerId?: number, visitMainId?: number) {
    return this.http
      .get(
        `${this.API_URL}auth/customer/visit/main/form?customerId=${customerId}&visitMainId=${visitMainId}`
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  saveVisitMainForm(mainForm) {
    console.log(mainForm);

    return this.http
      .post(`${this.API_URL}auth/customer/visit/main/save`, { ...mainForm })
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
  closeMainVisit(visiMainId) {
    console.log(visiMainId);
    return this.http
      .post(
        `${this.API_URL}auth/customer/visit/main/close?visitMainId=${visiMainId}`,null
      )
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
