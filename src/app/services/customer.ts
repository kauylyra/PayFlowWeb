import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerList, CustomerAdd } from '../models/Customer';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly apiUrl = `${environment.apiBaseUrl}/customer`;

  constructor(private http: HttpClient) {}

  GetCustomers(): Observable<Response<CustomerList[]>> {
    return this.http.get<Response<CustomerList[]>>(
      `${this.apiUrl}/customers`
    );
  }

  GetCustomerById(id: number): Observable<Response<CustomerList>> {
    return this.http.get<Response<CustomerList>>(
      `${this.apiUrl}/customers/${id}`
    );
  }

  AddCustomer(customer: CustomerAdd): Observable<Response<number>> {
    return this.http.post<Response<number>>(
      `${this.apiUrl}/customers`,
      customer
    );
  }

UpdateCustomer(id: number, customer: CustomerAdd): Observable<Response<boolean>> {
  return this.http.put<Response<boolean>>(`${this.apiUrl}/customer/${id}`, customer);
}

DeleteCustomer(id: number): Observable<Response<boolean>> {
  return this.http.delete<Response<boolean>>(`${this.apiUrl}/customer/${id}`);
}
}