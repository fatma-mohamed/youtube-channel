import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
@NgModule({
  imports: [MatToolbarModule, MatTableModule],
  exports: [MatToolbarModule, MatTableModule]
})
export class MaterialModule {}
