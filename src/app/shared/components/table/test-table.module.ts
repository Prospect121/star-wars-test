import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTableBodyDirective, TestTableComponent } from './test-table.component';
import { PaginationModule } from '../pagination/pagination.module';



@NgModule({
  declarations: [
    TestTableComponent,
    TestTableBodyDirective
  ],
  imports: [
    CommonModule,
    PaginationModule,
  ],
  exports: [
    TestTableComponent,
    TestTableBodyDirective
  ]
})
export class TestTableModule { }
