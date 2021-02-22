import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SharedServiceService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVisitType() {
    console.log('typelist vall')
    return this.http.get(`${this.API_URL}auth/customer/visit/type/list`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
