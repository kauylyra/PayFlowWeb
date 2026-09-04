import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { CustomerService } from '../../services/customer';

import { CustomerList } from '../../models/Customer';

import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  Router
} from '@angular/router';

@Component({
  imports: [
    CommonModule,
    RouterLink,
    RouterModule
],
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {

  customers: CustomerList[] = [];
  customersGeneral: CustomerList[] = [];

  message = '';
  errorMessage = '';

  constructor(
    private serviceCustomer: CustomerService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    const state = history.state;

    if (state?.message) {
      this.message = state.message;

      history.replaceState({}, document.title, window.location.href);
    }

    this.loadCustomers();
  }

  loadCustomers(): void {

    this.serviceCustomer.GetCustomers().subscribe({

      next: (response) => {

        this.customers = response.result;
        this.customersGeneral = response.result;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(
          'Erro ao buscar clientes:',
          error
        );

        this.errorMessage =
          'Erro ao carregar clientes.';

        this.cdr.detectChanges();

      }

    });
  }

searchCustomer(event: Event): void {

  const target = event.target as HTMLInputElement;

  const value = target.value.toLowerCase().trim();

  this.customers = this.customersGeneral.filter(customer => {

    const name = customer.name
      .toLowerCase();

    const email = customer.email
      .toLowerCase();

    const document = customer.document
      .toLowerCase();

    const createdAt = new Date(customer.createdAt)
      .toLocaleDateString('pt-BR');

    return (
      name.includes(value) ||
      email.includes(value) ||
      document.includes(value) ||
      createdAt.includes(value)
    );
  });

  this.cdr.detectChanges();
}

  deleteCustomer(id: number): void {

    this.serviceCustomer.DeleteCustomer(id)
      .subscribe({

        next: () => {

          this.customers =
            this.customers.filter(
              customer => customer.id !== id
            );

          this.customersGeneral =
            this.customersGeneral.filter(
              customer => customer.id !== id
            );

          this.message =
            'Cliente deletado com sucesso.';

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Erro ao deletar cliente:',
            error
          );

          this.errorMessage =
            'Erro ao deletar cliente.';

          this.cdr.detectChanges();

        }

      });
  }
}