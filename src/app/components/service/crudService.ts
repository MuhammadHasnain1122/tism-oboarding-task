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
   }

   
   UpdateProduct(p:any): void{
    this.Products.filter((v: any) => {
      if(v.id == p.id){
         this.Products.pop();
      }
    })
    this.Products.push(p);
    this.Products$.next(this.Products);
   }


   deleteTask(obj: any){
    this.Products.filter((v: any) => {
      if(v.id == obj.id){
        this.Products.pop();
        this.Products$.next(this.Products);
      }
    })
   }
}