import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoNumberComponent } from "./auto-number/auto-number.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MatterCreateComponent } from "./matter-create/matter-create.component";
import { MatterDetailsComponent } from "./matter-details/matter-details.component";
import { MatterListComponent } from "./matter-list/matter-list.component";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "autonumber", component: AutoNumberComponent },
  { path: "create", component: MatterCreateComponent },
  { path: "list", component: MatterListComponent },
  { path: "details/:id", component: MatterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
