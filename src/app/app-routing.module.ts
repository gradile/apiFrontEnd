import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoNumberComponent } from "./auto-number/auto-number.component";

import { MatterCreateComponent } from "./matter-create/matter-create.component";
import { MatterDetailsComponent } from "./matter-details/matter-details.component";
import { MatterListComponent } from "./matter-list/matter-list.component";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },

  { path: "autonumber", component: AutoNumberComponent, pathMatch: "full" },
  { path: "create", component: MatterCreateComponent, pathMatch: "full" },
  { path: "list", component: MatterListComponent, pathMatch: "full" },
  { path: "details/:id", component: MatterDetailsComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
