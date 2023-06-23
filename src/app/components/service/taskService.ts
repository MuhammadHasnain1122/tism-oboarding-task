import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { taskForm } from '../interface/Taskform';

@Injectable({
  providedIn: 'root'
})

export class taskService {
  
 Tasks$ : BehaviorSubject<taskForm[]>;
  Tasks : taskForm[] = []


  constructor() {
   this.Tasks$ = new BehaviorSubject<taskForm[]>(this.Tasks);
   }


   /**
    * 
    * @param object this function use for adding task
    */
   addTask(p: taskForm): void{
    this.Tasks.push(p);
   this.Tasks$.next(this.Tasks);
   }

   
   /**
    * 
    * @param Object this function use for updating task
    */
   updateTask(p:any): void{
    this.Tasks = this.Tasks.filter(v => v.id != p.id)
    this.Tasks.push(p);
   this.Tasks$.next(this.Tasks);
   }

   
   /**
    * 
    * @param Object this function use for deleting a task
    */
   deleteTask(obj: any){
    this.Tasks.filter((v: any) => {
      if(v.id == obj.id){
       this.Tasks = this.Tasks.filter(v => v.id != obj.id)
       this.Tasks$.next(this.Tasks);
      }
    })
   }
}