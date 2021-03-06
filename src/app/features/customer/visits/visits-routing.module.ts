import { MainVisitComponent } from "./pages/main-visit/main-visit.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: MainVisitComponent,
  },
  {
    path: "detail",
    loadChildren: () =>
      import("./visit-detail/visit-detail.module").then(
        (m) => m.VisitDetailModule
      ),
    data: {
      breadcrumb: { label: "Visit-detail" },

      // allowedRoles: [UserRoleType.ROLE_ALL],
    },
    // canActivate: [UserRoleGuardService],
  },
 /*  {
    path: "deposit",
    loadChildren: () =>
      import("./main-deposit/main-deposit.module").then(
        (m) => m.MainDepositModule
      ),
    data: {
      // allowedRoles: [UserRoleType.ROLE_ALL],
    },
    // canActivate: [UserRoleGuardService],
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class VisitsRoutingModule {}
