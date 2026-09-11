import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaymentService } from '../../services/payment';
import {
  PaymentList,
  PaymentItem,
  CustomerPayment
} from '../../models/Payment';

@Component({
  imports: [
    CommonModule,
    RouterModule
  ],
  selector: 'app-payments',
  styleUrl: './payments.css',
  templateUrl: './payments.html',
})
export class Payments implements OnInit {

  payments: PaymentItem[] = [];
  paymentsGeneral: PaymentItem[] = [];

  customer: CustomerPayment | null = null;

  message = '';
  errorMessage = '';

  customerId: number | null = null;

  constructor(
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const state = history.state;

    if (state?.message) {
      this.message = state.message;

      history.replaceState(
        {},
        document.title,
        window.location.href
      );
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.customerId = Number(id);
    }

    this.loadPayments();
  }

  loadPayments(): void {

    this.paymentService.GetPayments(
      this.customerId ?? undefined
    ).subscribe({

      next: (response) => {

        this.customer = response.result?.customer ?? null;

        this.payments = response.result?.payments ?? [];

        this.paymentsGeneral = [...this.payments];

        this.cdr.detectChanges();
      },

      error: (error) => {

        this.errorMessage =
          'Ocorreu um erro ao carregar os pagamentos.';

        console.error(error);
      }

    });
  }

  searchPayment(event: Event): void {

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase().trim();

    this.payments = this.paymentsGeneral.filter(payment => {

      const description =
        payment.description?.toLowerCase() ?? '';

      const status =
        payment.status?.toLowerCase() ?? '';

      const amount =
        payment.amount?.toString() ?? '';

      const createdAt =
        new Date(payment.createdAt)
          .toLocaleDateString('pt-BR');

      const paymentMethod =
        payment.paymentMethod?.name?.toLowerCase() ?? '';

      return (
        description.includes(value) ||
        status.includes(value) ||
        amount.includes(value) ||
        createdAt.includes(value) ||
        paymentMethod.includes(value)
      );
    });

    this.cdr.detectChanges();
  }

  deletePayment(id: number): void {

    if (confirm('Tem certeza que deseja excluir este pagamento?')) {

      this.paymentService.DeletePayment(id).subscribe({

        next: () => {

          this.payments =
            this.payments.filter(
              payment => payment.id !== id
            );

          this.paymentsGeneral =
            this.paymentsGeneral.filter(
              payment => payment.id !== id
            );

          this.message =
            'Pagamento excluído com sucesso.';

          this.loadPayments();

          this.cdr.detectChanges();
        },

        error: (error) => {

          this.errorMessage =
            'Ocorreu um erro ao excluir o pagamento.';

          console.error(error);
        }

      });

    }
  }
}