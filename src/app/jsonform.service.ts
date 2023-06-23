import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'any',
  })

  export class JsonService {
    constructor(public http: HttpClient) {}

    getUsersForm() {
        return this.http.get<any[]>('/assets/add-task-form.json');
      }
  }