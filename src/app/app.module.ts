import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPrintModule } from "ngx-print";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerComponent } from "./shared/components/ngx-spinner/ngx-spinner.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { JwtModule } from "@auth0/angular-jwt";
import { BreadcrumbModule } from "xng-breadcrumb";
import { HttpTokenInterceptorService } from "./core/http-interceptor/http-token/http-token-interceptor.service";

@NgModule({
  declarations: [AppComponent, NgxSpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPrintModule,
    NgbModule,
    BreadcrumbModule,
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
        throwNoTokenError: true,
      },
    }),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptorService,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent],
})
export class AppModule {}
