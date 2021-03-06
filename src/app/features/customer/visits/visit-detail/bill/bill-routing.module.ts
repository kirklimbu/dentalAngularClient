import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './pages/invoice/invoice.component';

const routes: Routes = [
  {
    path: "",
    component: InvoiceComponent,
    data:{
      breadcrumb: { label: "Print Invoice" },

    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
