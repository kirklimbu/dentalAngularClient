import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./core/guards/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./features/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "dental",
    loadChildren: () =>
      import("./features/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuardService],
    data: { breadcrumb: { label: "Dental", disable: true } },
  },

  {
    path: "",
    pathMatch: "full",
    redirectTo: "login", // change it to login page
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "login", // change it to page 404
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
