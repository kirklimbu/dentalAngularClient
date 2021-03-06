import { VisitTabContainerComponent } from "./../visit-tab-container/visit-tab-container.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: VisitTabContainerComponent,
    children: [],
  },
  {
    path: "invoice",
    loadChildren: () => import("./bill/bill.module").then((m) => m.BillModule),
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
export class VisitDetailRoutingModule {}
