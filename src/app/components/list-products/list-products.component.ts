import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,PipeTransform , Pipe, ViewChild, SimpleChanges, Input } from '@angular/core';
import { IProduct } from '../interface/product';
import { IUserForm } from '../interface/userForm';
import { Observable, Subscription, map } from 'rxjs';
import { CrudService } from '../service/crudService';
import { CommonModule } from '@angular/common'
import {Table, TableModule} from 'primeng/table';
import { LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { PipesModule } from '../pipe/pipe.module';
import { SubSink } from 'subsink';
import { assignValues } from '../service/formvalidationService';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { JsonService } from 'src/app/json.service';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PipesModule,
    DynamicFormsPrimeNGUIModule,
    FormsModule,
    ReactiveFormsModule,
    AddProductFormComponent,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule
  ],
  providers: [DialogService, MessageService, DynamicFormService,ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListProductsComponent implements OnInit, OnDestroy{


  products: any =  Observable<IUserForm[]> ;
  col: any;
  movies$: any;
  selectAll: any;
  loading: boolean = false
  selectedCustomers: any;
  allData: any =  Observable<IUserForm[]>;
  isData: boolean = false;
  private subscriptions = new SubSink();
  totalRecords: number = 0;
  datasource: any;

  public formData: any;
  dynamicFormGroup!: FormGroup;
  formGroup!: UntypedFormGroup;
  @Input() model: any;
  formModel: any;
  checked: boolean = false;
  getProductObj: any ;
  isDeleted: any;

  activityValues: number[] = [0, 100];

  
  pTableOptions = {
    rows: 10,
    rowsPerPageOptions: [20, 50, 100],
    paginator: true,
    showCurrentPageReport: true,
    reorderableColumns: true,
    lazy: true,
    stateStorage: 'local',
    currentPageReportTemplate: 'Showing {first} to {last} of {totalRecords} entries',
    emptyMessage: 'No records found',
  };
  
  @ViewChild("dt1") private tableRef: Table | undefined;


  constructor(public appService: CrudService,
    public dfs: DynamicFormService,
    public jsonService: JsonService,
    public dialogService: DialogService, 
    private confirmationService: ConfirmationService, private messageService: MessageService) {}

    ref: any = DynamicDialogRef;

  ngOnInit() {
    this.allData =  this.appService.Products$
    this.appService.Products$.subscribe(data => this.products = data);
    this.products.forEach((customer: any) => (customer.warranty_ends = new Date(<Date>customer.warranty_ends)));
    console.log(this.products, "pp")
    if(this.products.length > 0){
      this.initTable();
    }

  }

  show(e: any) {
    this.ref = this.dialogService.open(AddProductFormComponent, {
      data: {
        bookData: Object.assign({}, e),
        text: "update"
      },
        header: 'Update a Product',
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

  getSortingField(col: any) {
    console.log(col)
    return col.sortingField || col.data;
  }

  getObj(e: any){
      this.getProductObj = e;

      this.checked = true;
 
  }


deleteObj(e: any) {
  this.isDeleted = true;
  this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        debugger
          this.products  = this.products.filter((v: any) =>  v.id != e.id)
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type: any) => {
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          }
  });
}

 
initTable() {
  this.col = [
    {
      data: 'text2',
      title: 'Name',
      sortingField: 'text2',
      clickable: true,
      cssClass: 'font-weight-bold text-underline',
      visible: true,
      field: 'text2'
    },
    {
      data: 'users',
      sortingField: 'users',
      title: 'Assignee',
      visible: true,
      field: 'users'
    },
    {
      data: 'status',
      title: 'Status',
      sortingField: 'status',
      visible: true,
      field: 'status'
    },
    {
      data: 'warranty_ends',
      sortingField: 'warranty_ends',
      title: 'Date',
      visible: true,
      field: 'warranty_ends'
    },
    {
      data: 'notes',
      title: 'Description',
      sortingField: 'notes',
      style: { width: '500px' },
      visible: true,
      field: 'notes'
    },
  ];
}

clear(table: Table) {
  table.clear();
}


getSeverity(status: any) {
  switch (status.toLowerCase()) {
      case 'inprogress':
          return 'info';

      case 'complete':
          return 'success';
  }
  return ;
}

ngOnDestroy() {
  if (this.ref) {
      this.ref.close();
  }
}

}
