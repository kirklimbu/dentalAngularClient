import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CoreModule } from "src/app/core/core.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, CoreModule,
  ],
  // providers: [],
})
export class DashboardModule {}
