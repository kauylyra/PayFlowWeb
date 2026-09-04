import { Component } from '@angular/core';
import { Form } from "../../components/form/form";
import { CustomerList } from '../../models/Customer';
import { CustomerService } from '../../services/customer';
import { Router } from '@angular/router';

@Component({
  imports: [Form],
  selector: 'app-cadastro',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  constructor(private serviceCustomer: CustomerService, private router: Router) {}

  AddCustomer(customer: CustomerList) {
  this.serviceCustomer.AddCustomer(customer).subscribe(response => {
    console.log('Customer added successfully:', response);
    this.router.navigate(['/']);
  })
  }
}
