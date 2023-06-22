import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { taskForm } from '../interface/Taskform';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  
  Products$ : BehaviorSubject<taskForm[]>;
  Products : taskForm[] = []


  constructor() {
    this.Products$ = new BehaviorSubject<taskForm[]>(this.Products);
   }


   /**
    * 
    * @param object this function use for adding task
    */
   addTask(p: taskForm): void{
    this.Products.push(p);
    this.Products$.next(this.Products);
   }

   
   /**
    * 
    * @param Object this function use for updating task
    */
   updateTask(p:any): void{
    this.Products = this.Products.filter(v => v.id != p.id)
    this.Products.push(p);
    this.Products$.next(this.Products);
   }

   
   /**
    * 
    * @param Object this function use for deleting a task
    */
   deleteTask(obj: any){
    this.Products.filter((v: any) => {
      if(v.id == obj.id){
       this.Products = this.Products.filter(v => v.id != obj.id)
        this.Products$.next(this.Products);
      }
    })
   }
}