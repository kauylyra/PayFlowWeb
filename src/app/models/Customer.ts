export interface CustomerList {
  id: number;
  name: string;
  email: string;
  document: string;
  createdAt: string;
  updatedAt: string | null;
  payments: CustomerPayment[];
}

export interface CustomerPayment {
  id: number;
  paymentMethodId: number;
  amount: number;
  status: string;
  description: string | null;
  createdAt: string;
}

export interface CustomerAdd {
  name: string;
  email: string;
  document: string;
}
