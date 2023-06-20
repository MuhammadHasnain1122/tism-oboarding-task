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
    ButtonModule
  ],
  providers: [DialogService, MessageService, ToastsService, DynamicFormService, DynamicDialogConfig]
})

export class AddProductFormComponent implements OnInit, OnDestroy{

  public formData: any;
  private subscriptions = new SubSink();
  dynamicFormGroup!: FormGroup;
  formGroup!: UntypedFormGroup;
  @Input() model: any;
  @Input()  getObj: any;
  formModel: any;
  checked: boolean = false;
  @Input()  isUpdate: any;
  visible: boolean = false;
  duplicateObj: any;


  constructor(private fb: FormBuilder, private appService: CrudService,
    public dfs: DynamicFormService,
    private messageService: MessageService, 
    public ref: DynamicDialogRef,
    private jsonService: JsonService,
    public config: DynamicDialogConfig) {}

  ngOnInit() {
    console.log(this.getObj, "ll")
    console.log(this.isUpdate, "kkk")

   console.log( this.config.data, "okat");
  


    this.subscriptions.sink = this.jsonService
      .getUsersForm()
      .subscribe((formModelJson) => {
    const formModel = assignValues(formModelJson, this.getObj);
    this.formModel = this.dfs.fromJSON(formModel);
    this.formGroup = this.dfs.createFormGroup(this.formModel);
      });
  }



  addProduct() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value, "values")
      this.appService.AddProduct(this.formGroup.value);
    }
    this.formGroup.reset();
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record Added' });
    setTimeout(() => {
      this.ref.close('close')
    }, 1000)
 
  
  }


  update(){
    if (this.formGroup.valid) {
      console.log(this.formGroup.value, "values")
      this.appService.AddProduct(this.formGroup.value);
    }
    this.formGroup.reset();
    this.ref.close('close')
  }

    
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
}

}
