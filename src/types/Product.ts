import { Id } from "./Id";

export interface Product extends Id<string> {
  id: string,
  price: { amount: string, unit: string, symbol: string },
  inventory: { amount: string },
  name: string,
  description: string
}