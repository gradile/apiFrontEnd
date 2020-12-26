import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoNumberComponent } from "./auto-number/auto-number.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "autonumber", component: AutoNumberComponent },
  { path: "", pathMatch: "full", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
