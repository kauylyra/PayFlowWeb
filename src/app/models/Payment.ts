export interface PaymentList {

  customer: CustomerPayment;

  payments: PaymentItem[];

}

export interface PaymentItem {

  id: number;

  customerId: number;

  paymentMethodId: number;

  amount: number;

  status: string;

  description: string | null;

  createdAt: string;

  updatedAt: string | null;

  paymentMethod: PaymentMethod;

}

export interface CustomerPayment {

  id: number;

  name: string;

  email: string;

  document: string;

  createdAt: string;

  updatedAt: string | null;

}

export interface PaymentMethod {

  id: number;

  name: string;

  description: string | null;

  isActive: boolean;

}

export interface PaymentAdd {

  id_Payment: number;

  Status: boolean;

}