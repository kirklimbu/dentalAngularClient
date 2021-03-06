import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BillRoutingModule } from "./bill-routing.module";
import { InvoiceComponent } from "./pages/invoice/invoice.component";
import { BreadcrumbModule } from "xng-breadcrumb";
import { MaterialModule } from "src/app/shared/material-lib/material/material.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPrintModule } from "ngx-print";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    MaterialModule,
    SharedModule,
    NgbModule,
    NgxPrintModule,
    BreadcrumbModule,
  ],
})
export class BillModule {}
