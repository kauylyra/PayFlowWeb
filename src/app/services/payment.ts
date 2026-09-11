import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  PaymentList,
  PaymentAdd
} from '../models/Payment';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly apiUrl =
    `${environment.apiBaseUrl}/payment`;

  constructor(private http: HttpClient) {}

  GetPayments(
  customerId?: number,
  paymentMethodId?: number,
  status?: string,
  page: number = 1,
  pageSize: number = 20
): Observable<Response<PaymentList>> {

    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (customerId !== undefined) {
      params = params.set('customerId', customerId);
    }

    if (paymentMethodId !== undefined) {
      params = params.set('paymentMethodId', paymentMethodId);
    }

    if (status) {
      params = params.set('status', status);
    }

        return this.http.get<Response<PaymentList>>(
    `${this.apiUrl}/payments`,
    { params }
    );
  }

  GetPaymentById(
    id: number
  ): Observable<Response<PaymentList>> {
    return this.http.get<Response<PaymentList>>(
      `${this.apiUrl}/payments/${id}`
    );
  }

  AddPayment(
    payment: PaymentAdd
  ): Observable<Response<number>> {
    return this.http.post<Response<number>>(
      `${this.apiUrl}/payments`,
      payment
    );
  }

  UpdatePayment(
    id: number,
    payment: PaymentList
  ): Observable<Response<boolean>> {
    return this.http.put<Response<boolean>>(
      `${this.apiUrl}/payments/${id}`,
      payment
    );
  }

  DeletePayment(
    id: number
  ): Observable<Response<boolean>> {
    return this.http.delete<Response<boolean>>(
      `${this.apiUrl}/payments/${id}`
    );
  }
}