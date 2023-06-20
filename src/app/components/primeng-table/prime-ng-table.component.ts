import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService, Book } from 'src/app/table-service';
import { Table } from 'primeng/table';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {  MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import {TableModule} from 'primeng/table';


@Component({
  selector: 'prime-ng-component',
  templateUrl: './prime-ng-table.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MultiSelectModule,
    TableModule
  ]
})

export class primeNgTable implements OnInit  {
  public formData: any;
  books!: Book[];
  totalLength: any = 0;
  col: any;

  pTableOptions = {
    rows: 10,
    rowsPerPageOptions: [20, 50, 100],
    paginator: true,
    showCurrentPageReport: true,
    reorderableColumns: true,
    lazy: true,
    stateStorage: 'local',
    currentPageReportTemplate: 'Showing {first} to {last} of {totalRecords} entries',
    emptyMessage: 'No records found',
  };


  @ViewChild('columnVisibility') private dtColumnSelect: MultiSelect | undefined;
  @ViewChild('dt') private dtElement: Table | undefined;

  constructor(private bookService: BookService){}

  ngOnInit() {
    this.initTable();
    this.bookService.getBooks().
    subscribe((books) => {
      this.totalLength = books.data.length
      this.books = books.data
    });
}


initTable() {
  this.col = [
    {
      data: 'title',
      title: 'Title',
      clickable: true,
      cssClass: 'font-weight-bold text-underline',
      visible: true,
      field: 'name'
    },
    {
      data: 'description',
      title: 'Description',
      style: { width: '500px' },
      visible: true,
      field: 'price'
    },
    {
      data: 'created',
      title: 'Created Date',
      visible: true,
      field: 'author'
    },
    {
      data: 'created_by.name',
      title: 'Created By',
      visible: true,
      field: 'date1'
    },
    {
      data: 'status_name',
      sortingField: 'status',
      title: 'Status',
      visible: true,
      field: 'date2'
    },
    {
      data: 'modified',
      title: 'Modified',
      visible: true,
      field: 'date3'
    }
  ];
}
}
