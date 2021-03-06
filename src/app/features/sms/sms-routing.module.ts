import { NextDayComponent } from "./message/pages/next-day/next-day.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SmsFormComponent } from "./sms-form/sms-form.component";
import { BirthdayComponent } from "./message/pages/birthday/birthday.component";
import { VisitTypeComponent } from "./message/pages/visit-type/visit-type.component";

const routes: Routes = [
  {
    path: "",
    component: SmsFormComponent,
  },
  {
    path: "nextDay",
    component: NextDayComponent,
  },
  {
    path: "birthday",
    component: BirthdayComponent,
  },
  {
    path: "visitType",
    component: VisitTypeComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsRoutingModule {}
