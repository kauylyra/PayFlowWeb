import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CustomerService } from '../../services/customer';
import { CustomerList } from '../../models/Customer';

@Component({
  imports: [
    CommonModule,
    RouterModule
  ],
  standalone: true,
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export class Details implements OnInit {

  customer: CustomerList | null = null;

  constructor(
    private serviceCustomer: CustomerService,
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

    console.log('Buscando cliente ID:', id);

    this.serviceCustomer.GetCustomerById(id).subscribe({

      next: (response) => {

        console.log('RESPONSE COMPLETO:', response);
        console.log('RESULT:', response.result);
        console.log('CUSTOMER:', response.result?.name);
        console.log('PAYMENTS:', response.result?.payments);

        this.customer = response.result ?? null;

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(
          'Erro ao buscar cliente:',
          error
        );

      }

    });

  }
}