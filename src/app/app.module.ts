import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { from } from "rxjs";

import { AutoNumberComponent } from "./auto-number/auto-number.component";
import { MatterListComponent } from "./matter-list/matter-list.component";
import { MatterCreateComponent } from "./matter-create/matter-create.component";
import { MatterDetailsComponent } from "./matter-details/matter-details.component";

@NgModule({
  declarations: [
    AppComponent,

    AutoNumberComponent,
    MatterListComponent,
    MatterCreateComponent,
    MatterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
