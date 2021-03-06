import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from "./pages/customer/customer.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent,
  },
  {
    path: "visits",
    loadChildren: () =>
      import("./visits/visits.module").then((m) => m.VisitsModule),
    data: {
      breadcrumb: { label: "Visits" },

      // allowedRoles: [UserRoleType.ROLE_ALL],
    },
    // canActivate: [UserRoleGuardService],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
