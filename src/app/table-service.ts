import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Book {
  name: any;
  price: any;
  author: any;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<any>('/assets/table-data.json')
      ;
    }
}