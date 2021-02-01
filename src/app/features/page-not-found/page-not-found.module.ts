import { MaterialModule } from "src/app/shared/material-lib/material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PageNotFoundRoutingModule } from "./page-not-found-routing.module";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, PageNotFoundRoutingModule, MaterialModule],
})
export class PageNotFoundModule {}
