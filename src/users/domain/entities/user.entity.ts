export class User {
  id: string;
  login: string;
  password: string;
  lastName: string;
  firstName?: string;
  email: string;
  phone?: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
