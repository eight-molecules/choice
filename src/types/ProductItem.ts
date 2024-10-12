import { Id } from "./Id";

export interface ProductItem extends Id<string | number> {
  id: string | number,
  price: { amount: string, unit: string, symbol: string },
  inventory: { amount: string },
  name: string,
  description: string
}