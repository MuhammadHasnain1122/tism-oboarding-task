import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsonFormComponent } from './components/json-form/json-form/json-form.component';
import { primeNgTable } from './components/primeng-table/prime-ng-table.component';
import { DisplayCrudComponent } from './components/display-crud/display-crud.component';

const routes: Routes = [
  { path: '', component: primeNgTable },
  { path: 'form', component: JsonFormComponent },
  { path: 'display', component: DisplayCrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
