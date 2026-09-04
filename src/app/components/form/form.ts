import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import {
  RouterLink,
  RouterModule
} from '@angular/router';

import {
  CustomerAdd,
  CustomerList
} from '../../models/Customer';

@Component({
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule
  ],
  selector: 'app-form',
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form implements OnInit, OnChanges {

  @Input() customerData: CustomerList | null = null;

  @Input() isEditMode = false;

  @Output() onSubmit = new EventEmitter<CustomerAdd>();

  customerForm!: FormGroup;

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      document: new FormControl('')
    });

    this.updateForm();
  }

  ngOnChanges(): void {
    this.updateForm();
  }

  private updateForm(): void {
    if (!this.customerForm) {
      return;
    }

    if (!this.customerData) {
      return;
    }

    this.customerForm.patchValue({
      name: this.customerData.name,
      email: this.customerData.email,
      document: this.customerData.document
    });
  }

  submit(): void {
    if (this.customerForm.invalid) {
      return;
    }

    this.onSubmit.emit(this.customerForm.value);
  }
}