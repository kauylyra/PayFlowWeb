import { Component } from '@angular/core';

import { Form } from '../../components/form/form';

import { CustomerAdd } from '../../models/Customer';

import { CustomerService } from '../../services/customer';

import { Router } from '@angular/router';

@Component({
  imports: [Form],
  selector: 'app-cadastro',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  constructor(
    private serviceCustomer: CustomerService,
    private router: Router
  ) {}

  AddCustomer(customer: CustomerAdd): void {

    this.serviceCustomer.AddCustomer(customer)
      .subscribe({

        next: (response) => {

          console.log(
            'Customer cadastrado com sucesso:',
            response
          );

          this.router.navigate(['/'], {

            state: {
              message: 'Cliente cadastrado com sucesso!'
            }

          });

        },

        error: (error) => {

          console.error(
            'Erro ao cadastrar cliente:',
            error
          );

        }

      });
  }
}