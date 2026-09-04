import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CustomerService } from '../../services/customer';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CustomerAdd,
  CustomerList
} from '../../models/Customer';

import { Form } from '../../components/form/form';

@Component({
  imports: [Form],
  selector: 'app-update',
  styleUrl: './update.css',
  templateUrl: './update.html',
})
export class Update implements OnInit {

  customer: CustomerList | null = null;

  constructor(
    private serviceCustomer: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      console.error('ID do cliente inválido.');
      return;
    }

    this.serviceCustomer.GetCustomerById(id).subscribe({

      next: (response) => {

        console.log('CLIENTE RECEBIDO:', response);

        if (response.result) {

          this.customer = response.result;

          console.log('CUSTOMER ATRIBUÍDO:', this.customer);

          this.cdr.detectChanges();

        } else {

          console.error(
            'Cliente não encontrado:',
            response.message
          );

        }

      },

      error: (error) => {

        console.error(
          'Erro ao buscar cliente:',
          error
        );

      }

    });
  }

  UpdateCustomer(
    id: number,
    customer: CustomerAdd
  ): void {

    this.serviceCustomer.UpdateCustomer(id, customer)
      .subscribe({

        next: (response) => {

          console.log(
            'Customer atualizado com sucesso:',
            response
          );

          this.router.navigate(['/'], {
            state: {
              message: 'Cliente atualizado com sucesso!'
            }
          });

        },

        error: (error) => {

          console.error(
            'Erro ao atualizar cliente:',
            error
          );

        }

      });
  }
}