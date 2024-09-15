import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SmtpScreenPage } from "./smtp-screen.page";
import { ComponentsModule } from "../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: SmtpScreenPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    ComponentsModule
  ],
  exports: [RouterModule],
})
export class SmtpScreenPageRoutingModule {}
