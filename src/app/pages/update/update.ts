import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerList } from '../../models/Customer';
import { Form } from "../../components/form/form";

@Component({
  imports: [Form],
  selector: 'app-update',
  styleUrl: './update.css',
  templateUrl: './update.html',
})
export class Update implements OnInit {

   customer!: CustomerList;

  constructor(private serviceCustomer: CustomerService, private router: Router, private route: ActivatedRoute) {}


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceCustomer.GetCustomerById(id).subscribe(response => {
      if (response.result) {
        this.customer = response.result;
      } else {
        console.error('Failed to fetch customer:', response.message);
      }
    });
  }

  UpdateCustomer(id: number, customer: CustomerList) {
    this.serviceCustomer.UpdateCustomer(id, customer).subscribe(response => {
      console.log('Customer updated successfully:', response);
      this.router.navigate(['/']);
    })
  }
}
