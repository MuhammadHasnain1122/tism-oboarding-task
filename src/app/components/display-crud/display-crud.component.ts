import { Component , OnDestroy, ViewChild } from '@angular/core';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { ListProductsComponent } from '../list-products/list-products.component';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import {ButtonModule} from 'primeng/button';
import { Table } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-display-crud',
  templateUrl: './display-crud.component.html',
  styleUrls: ['./display-crud.component.css'],
  standalone: true,
  imports: [
    ToastModule,
    AddProductFormComponent,
    ListProductsComponent,
    DynamicFormsPrimeNGUIModule,
    ButtonModule,
  ],
  providers: [DialogService, MessageService, DynamicDialogRef]
})
export class DisplayCrudComponent implements OnDestroy {
  @ViewChild("Table") private tableRef: Table | undefined;

  constructor(public dialogService: DialogService, public messageService: MessageService,
      ) {}
  
  ref: any = DynamicDialogRef;

  show() {
      this.ref = this.dialogService.open(AddProductFormComponent, {
          header: 'Add a Product',
          width: '20%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
      });

      this.ref.onClose.subscribe((product: any) => {
          if (product) {
              this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
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
