import { VisitsModule } from "./../customer/visits/visits.module";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    // home
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./../home/home.module").then((m) => m.HomeModule),
        data: {
          breadcrumb: { label: "Dashboard" },

          // allowedRoles: [UserRoleType.ROLE_ALL],
        },
        // canActivate: [UserRoleGuardService],
      },
      {
        path: "customer",
        loadChildren: () =>
          import("../customer/customer.module").then((m) => m.CustomerModule),
        data: {
          breadcrumb: { label: "Customer" },
          // allowedRoles: [UserRoleType.ROLE_ALL],
        },
        // canActivate: [UserRoleGuardService],
      },

      {
        path: "sms",
        loadChildren: () =>
          import("./../sms/sms.module").then((m) => m.SmsModule),
        data: {
          breadcrumb: { label: "SMS", disable: true },
          // allowedRoles: [UserRoleType.ROLE_ALL],
        },
        // canActivate: [UserRoleGuardService],
      },
     
      {
        path: "404",
        loadChildren: () =>
          import("./../page-not-found/page-not-found.module").then(
            (m) => m.PageNotFoundModule
          ),
        data: {
          // allowedRoles: [UserRoleType.ROLE_ALL],
        },
        // canActivate: [UserRoleGuardService],
      },
    ],
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dental/404", // change it to login page
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/dental/404", // change it to page 404
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
