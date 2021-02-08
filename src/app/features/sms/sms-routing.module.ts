import { NextDayComponent } from "./message/pages/next-day/next-day.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SmsFormComponent } from "./sms-form/sms-form.component";

const routes: Routes = [
  {
    path: "",
    component: SmsFormComponent,
  },
  {
    path: "next-day",
    component: NextDayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsRoutingModule {}
