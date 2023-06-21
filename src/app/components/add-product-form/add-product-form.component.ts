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

  constructor(private fb: FormBuilder, private appService: CrudService,
    public dfs: DynamicFormService,
    private messageService: MessageService, 
    public ref: DynamicDialogRef,
    private jsonService: JsonService,
    public config: DynamicDialogConfig,
    ) {}

  ngOnInit() {
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
      this.appService.AddProduct(this.formGroup.value);
    }
    this.formGroup.reset();
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record Added' });
    setTimeout(() => {
      this.ref.close('close')
    }, 1000)
  
  }

    
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
}

}
