import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayTable } from './components/display-components/display-table.component';

const routes: Routes = [
  { path: '', component: DisplayTable },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
