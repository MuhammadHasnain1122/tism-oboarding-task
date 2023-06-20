import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { SubSink } from 'subsink';
import { JsonService } from 'src/app/json.service';
import { assignValues } from '../../service/formvalidationService';
import { CommonModule } from '@angular/common';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormsPrimeNGUIModule
  ]
})
export class JsonFormComponent {

  public formData: any;
  private subscriptions = new SubSink();
  dynamicFormGroup!: FormGroup;
  formGroup!: UntypedFormGroup;
  @Input() model: any;
  formModel: any;
  task: any = {
    "notes": "e4r5t6y7ui",
    "text": "ertyui",
    "text1": "ertyui",
    "text2": "wwertyu8i9"
  }
  checked: boolean = false;



  constructor(public dfs: DynamicFormService,
    public jsonService: JsonService) { }

  ngOnInit(): void {

    this.subscriptions.sink = this.jsonService
      .getUpdateTaskNotesForm()
      .subscribe((formModelJson) => {
        const formModel = assignValues(formModelJson, this.task);
        this.formModel = this.dfs.fromJSON(formModel);
        this.formGroup = this.dfs.createFormGroup(this.formModel);
      });
  }

  save() {
    this.checked = true;
  }


}
