import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'any',
  })

  export class JsonService {
    constructor(public http: HttpClient) {}

    getUpdateTaskNotesForm() {
        return this.http.get<any[]>('/assets/update-task-notes.json');
      }


    getUsersForm() {
        return this.http.get<any[]>('/assets/add-product-form.json');
      }
  }