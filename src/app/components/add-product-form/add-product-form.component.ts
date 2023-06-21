import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crudService';
import { CommonModule } from '@angular/common';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { JsonService } from 'src/app/json.service';
import { SubSink } from 'subsink';
import { assignValues } from '../service/formvalidationService';
import { DialogModule } from "primeng/dialog";
import { DialogService, DynamicDialogRef ,DynamicDialogConfig} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastsService } from '../ToastService';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormsPrimeNGUIModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    DynamicDialogModule
  ],
  providers: [DialogService, MessageService, ToastsService, DynamicFormService]
})

export class AddProductFormComponent implements OnInit, OnDestroy{

  public formData: any;
  private subscriptions = new SubSink();
  dynamicFormGroup!: FormGroup;
  formGroup!: UntypedFormGroup;
  @Input() model: any;
  formModel: any;
  inputData: any;
  updateButtonText: any;
  products: any = [];

  constructor(private fb: FormBuilder, private appService: CrudService,
    public dfs: DynamicFormService,
    private messageService: MessageService, 
    public ref: DynamicDialogRef,
    private jsonService: JsonService,
    public config: DynamicDialogConfig,
    ) {}

  ngOnInit() {
    // console.log(this.config.data?.products, "prod")
    this.updateButtonText =  this.config.data?.text ? this.config.data.text : "save"
    this.inputData = this.config.data?.bookData ? this.config.data.bookData : {}
    this.subscriptions.sink = this.jsonService
      .getUsersForm()
      .subscribe((formModelJson) => {
    const formModel = assignValues(formModelJson, this.inputData);
    this.formModel = this.dfs.fromJSON(formModel);
    this.formGroup = this.dfs.createFormGroup(this.formModel);
      });
  }


  addProduct() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value, "values")

      let id =  Math.floor(Math.random() * 9) + 1;
      let form = {...this.formGroup.value, id}
      if(this.config.data?.bookData){
        // debugger
        this.appService.Products$.subscribe(data => this.products = data);

        const upd_obj =  this.products.map((obj: any)=> {

          if (obj.id == this.config.data.bookData.id) {
           obj.name=this.formGroup.value['name'];
           obj.users=this.formGroup.value['users'];
           obj.status= this.formGroup.value['status'],
           obj.warranty_ends =this.formGroup.value['warranty_ends'],
           obj.notes = this.formGroup.value['notes']
          }
          return obj;
         })
         
        //  console.log(upd_obj);
        // this.appService.AddProduct(upd_obj);
        this.appService.UpdateProduct(upd_obj)
      }else {
        this.appService.AddProduct(form);
      }
     
    }

    this.formGroup.reset();
    if(this.updateButtonText){
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Task Updated' });

    }else {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Task Added' });

    }
    setTimeout(() => {
      this.ref.close('close')
    }, 500)
  
  }

    
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
}

}
