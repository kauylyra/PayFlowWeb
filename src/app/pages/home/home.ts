import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer';
import { CustomerList, CustomerAdd } from '../../models/Customer';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})

export class Home implements OnInit {
  customers: CustomerList[] = [];
  customersGeneral: CustomerList[] = [];
  selectedCustomer: CustomerList | null = null;

  loading = false;
  message = '';
  errorMessage = '';

  constructor(private serviceCustomer: CustomerService) {}

  
  ngOnInit(): void {
    this.serviceCustomer.GetCustomers().subscribe(response => {
        this.customers = response.result;
        this.customersGeneral = response.result;
      });
  }

 searchCustomer(event: Event) {
const target = event.target as HTMLInputElement; 
const value = target.value.toLowerCase();
this.customers = this.customersGeneral.filter(customer =>{
return  customer.name.toLowerCase().includes(value) 
 })
}

deleteCustomer(id: number) {
  this.serviceCustomer.DeleteCustomer(id).subscribe({
    next: () => {
      this.customers = this.customers.filter(customer => customer.id !== id);
      this.customersGeneral = this.customersGeneral.filter(customer => customer.id !== id);
      this.message = 'Customer deletado com sucesso.';
      window.location.reload();
    },
    error: (error) => {
      console.error(this.message);
      this.errorMessage = 'Erro ao deletar Customer.';
    }
  });
}
  

  // ngOnInit(): void {
  //   this.loadCustomers();
  // }

  // loadCustomers(): void {
  //   this.loading = true;
  //   this.clearMessages();

  //   this.serviceCustomer.GetCustomers().subscribe({
  //     next: (response) => {
  //       this.customers = response.result ?? [];
  //       this.loading = false;
  //     },
  //     error: (error) => this.showError(error, 'Erro ao buscar clientes.'),
  //   });
  // }

  // saveCustomer(name: string, email: string, document: string): void {
  //   const customer: CustomerPayload = {
  //     name,
  //     email,
  //     document,
  //   };

  //   this.clearMessages();

  //   this.serviceCustomer.AddCustomer(customer).subscribe({
  //     next: () => {
  //       this.message = 'Cliente cadastrado com sucesso.';
  //       this.loadCustomers();
  //     },
  //     error: (error) => this.showError(error, 'Erro ao cadastrar cliente.'),
  //   });
  // }

  // searchCustomerById(id: string): void {
  //   const customerId = Number(id);

  //   if (!customerId) {
  //     this.errorMessage = 'Informe um ID válido para buscar.';
  //     return;
  //   }

  //   this.clearMessages();

  //   this.serviceCustomer.GetCustomerById(customerId).subscribe({
  //     next: (response) => {
  //       this.selectedCustomer = response.result;
  //       this.message = 'Cliente encontrado.';
  //     },
  //     error: (error) => this.showError(error, 'Cliente não encontrado.'),
  //   });
  // }

  // private clearMessages(): void {
  //   this.message = '';
  //   this.errorMessage = '';
  // }

  // private showError(error: unknown, defaultMessage: string): void {
  //   console.error(error);
  //   this.errorMessage = defaultMessage;
  //   this.message = '';
  //   this.loading = false;
  // }
}
