import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { valueArrayPipe } from './valueArrayPipe';

@NgModule({
  declarations: [valueArrayPipe],
  imports: [
    CommonModule
  ],
  exports: [valueArrayPipe]
})
export class PipesModule { }