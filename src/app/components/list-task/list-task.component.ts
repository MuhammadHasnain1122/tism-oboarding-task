import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, PipeTransform, Pipe, ViewChild, SimpleChanges, Input } from '@angular/core';
import { taskForm } from '../interface/Taskform';
import { Observable, Subscription, map } from 'rxjs';
import { taskService } from '../service/taskService';
import { CommonModule } from '@angular/common'
import { Table, TableModule } from 'primeng/table';
import { LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { SubSink } from 'subsink';
import { assignValues } from '../service/formvalidationService';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { JsonService } from 'src/app/jsonform.service';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddProductFormComponent } from '../add-task/add-task-form.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DynamicFormsPrimeNGUIModule,
    FormsModule,
    ReactiveFormsModule,
    AddProductFormComponent,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
  ],
  providers: [DialogService, MessageService, DynamicFormService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListProductsComponent implements OnInit, OnDestroy {


  products: any = Observable<taskForm[]>;
  col: any;
  loading: boolean = false
  allData: any = Observable<taskForm[]>;
  totalRecords: number = 0;
  public formData: any;
  dynamicFormGroup!: FormGroup;
  formGroup!: UntypedFormGroup;
  @Input() model: any;
  formModel: any;
  checked: boolean = false;
  getProductObj: any;
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

  @ViewChild('dt') private dtElement!: Table;


  constructor(public appService: taskService,
    public dfs: DynamicFormService,
    public jsonService: JsonService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ref: any = DynamicDialogRef;

  ngOnInit() {
    this.allData = this.appService.Products$
    this.appService.Products$.subscribe(data => this.products = data);
    this.products.forEach((customer: any) => (customer.warranty_ends = new Date(<Date>customer.warranty_ends)));

    this.initTable();
  }


  show(e: any) {
    this.ref = this.dialogService.open(AddProductFormComponent, {
      data: {
        bookData: Object.assign({}, e),
        text: "Update",
        products: this.products
      },
      header: 'Update a Task',
      width: '40%',
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


  deleteObj(e: any) {
    this.isDeleted = true;
    this.confirmationService.confirm({
      message: 'Do you want to delete this task?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.appService.deleteTask(e);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Task deleted' });
      },
      reject: (type: any) => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


  initTable() {
    this.col = [
      {
        data: 'name',
        title: 'Name',
        sortingField: 'name',
        clickable: true,
        cssClass: 'font-weight-bold text-underline',
        visible: true,
        field: 'name'
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

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
