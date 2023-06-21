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

  Products : IUserForm[] = []

  constructor() {
    this.Products$ = new BehaviorSubject<IUserForm[]>(this.Products);
   }


   AddProduct(p: IUserForm): void{
    this.Products.push(p);
    this.Products$.next(this.Products);
    console.log(this.Products, "lll")
   }

   
   
   UpdateProduct(p:any): void{
    console.log(p)
    this.Products.push(p[0]);
    this.Products$.next(this.Products);
   }
}