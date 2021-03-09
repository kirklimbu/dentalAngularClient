import { ItemList } from "./item-list.model";

export class VisitDetail {
  visitDetailId?: number;
  customerId?: number;
  visitMainId: number;
  // amount?: number;
  visitAfterDay: number;
  traAmt : number;

  doctor: string;
  nextVisitDateBs?: string;
  visitDateBs: string;

  today: boolean;

  itemList: ItemList[];

  constructor() {
    this.itemList = [];
  }
}
