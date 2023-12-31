import { Component , OnDestroy, ViewChild } from '@angular/core';
import { AddProductFormComponent } from '../add-task/add-task-form.component';
import { ListtasksComponent } from '../list-task/list-task.component';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import {ButtonModule} from 'primeng/button';
import { Table } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  standalone: true,
  imports: [
    ToastModule,
    AddProductFormComponent,
    ListtasksComponent,
    DynamicFormsPrimeNGUIModule,
    ButtonModule,
  ],
  providers: [DialogService, MessageService, DynamicDialogRef]
})
export class DisplayTable implements OnDestroy {
  @ViewChild("Table") private tableRef: Table | undefined;

  constructor(public dialogService: DialogService, public messageService: MessageService,
      ) {}
  
  ref: any = DynamicDialogRef;

  show() {
      this.ref = this.dialogService.open(AddProductFormComponent, {
          header: 'Add a Task',
          width: '40%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
      });

      this.ref.onClose.subscribe((product: any) => {
          if (product) {
              this.messageService.add({ severity: 'info', summary: 'Task Selected', detail: product.name });
          }
      });

      this.ref.onMaximize.subscribe((value: any) => {
          this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
      });
  }

  showMol(){
   setTimeout(() => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

   }, 1000)
  }

  
  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}

}
