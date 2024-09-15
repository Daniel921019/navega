import { NgModule } from '@angular/core';
import {SafePipe} from './safe.pipe';
import {SearchFilterPipe} from './search-filter.pipe';


@NgModule({
  declarations: [
    SafePipe,
    SearchFilterPipe
  ],
  exports: [
    SafePipe,
    SearchFilterPipe
  ]
})
export class PipesModule { }
