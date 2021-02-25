import { CoreModule } from "src/app/core/core.module";
import { MaterialModule } from "src/app/shared/material-lib/material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { TodayBirthdaylistComponent } from "./pages/today-birthdaylist/today-birthdaylist.component";

@NgModule({
  declarations: [LoginComponent, TodayBirthdaylistComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
  ],
})

export class LoginModule {}
