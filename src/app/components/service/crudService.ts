import { Injectable } from '@angular/core';
import { IProduct } from '../interface/product';
import { BehaviorSubject } from 'rxjs';
import { IUserForm } from '../interface/userForm';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  pipe(arg0: any): any {
    throw new Error('Method not implemented.');
  }

  Products$ : BehaviorSubject<IUserForm[]>;

  Products : IUserForm[] = [
    {
        text2: "Hasnain",
        notes: "tyuhj",
        users: "premium",
        status: "complete",
        warranty_ends: "2023-06-12T07:00:00.000Z"
    },
    {
        text2: "Hasnain",
        notes: "tyuhj",
        users: "premium",
        status: "complete",
        warranty_ends: "2023-06-02T07:00:00.000Z"
    },
    {
        text2: "Hasnain",
        notes: "tyuhj",
        users: "premium",
        status: "complete",
        warranty_ends: "2023-06-27T07:00:00.000Z" 
      }
  ]

  constructor() {
    this.Products$ = new BehaviorSubject<IUserForm[]>(this.Products);
   }


   AddProduct(p: IUserForm): void{
    this.Products.push(p);
    this.Products$.next(this.Products);
   }

}