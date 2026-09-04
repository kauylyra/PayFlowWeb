import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from "@angular/router";
import { CustomerList } from '../../models/Customer';

@Component({
  imports: [RouterLink, RouterModule,ReactiveFormsModule],
  selector: 'app-form',
  styleUrl: './form.css',
  templateUrl: './form.html',
})
export class Form implements OnInit {

  @Input() customerData: CustomerList | null = null;

  @Output() onSubmit = new EventEmitter<CustomerList>();

  customerForm!:FormGroup;

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      id: new FormControl(this.customerData?.id || 0),
      name: new FormControl(this.customerData?.name || ''),
      email: new FormControl(this.customerData?.email || ''),
      document: new FormControl(this.customerData?.document || '')
    });
  }
  submit()
  {
    this.onSubmit.emit(this.customerForm.value);
  }
}