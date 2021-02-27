import { VisitType } from "./visit-type.model";

export class Customer {
  id: number;
  today: boolean;
  sendSMS: boolean;
  name: string;
  address: string;
  mobile: string;
  email?: string;
  dob?: string;
  photo?: string;
  regDateBs?: string;
  visitDateBs?: string;
  visitType?: VisitType;
}
