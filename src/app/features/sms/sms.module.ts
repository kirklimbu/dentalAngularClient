import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { SmsRoutingModule } from "./sms-routing.module";
import { SmsFormComponent } from "./sms-form/sms-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MaterialModule } from "src/app/shared/material-lib/material/material.module";
import { NpDatepickerModule } from "angular-nepali-datepicker";
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MessageComponent } from './message/pages/message/message.component';

@NgModule({
  declarations: [SmsFormComponent, MessageComponent],
  imports: [
    CommonModule,
    SmsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    NpDatepickerModule,
    BreadcrumbModule,
    FormsModule
  ],
  providers: [DatePipe],

})
export class SmsModule {}
