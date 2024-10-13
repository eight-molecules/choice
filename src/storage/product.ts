import { json } from "react-router-dom";
import IDBStorage from 'idbstorage';
import { ProductItem } from "../types/ProductItem";
import { parse } from "../network/response";

const storage = new IDBStorage({ name: 'product' });

export const store = (() => {
  storage.getItem(`Ids`).then((ids) => {
    if (!Array.isArray(ids)) {
      storage.setItem('Ids', []);
    }
  })

  return {
  get: async (k: string) => {
    const product = await parse(json(await storage.getItem(k))) as ProductItem

    return { ...product }
  },
  ids: async () => json([ ...await storage.getItem(`Ids`) ]),
  set: async (k, v: ProductItem) => {
    if (!await storage.getItem(k)) {
      const list = [] = await storage.getItem(`Ids`)
      storage.setItem(`Ids`, [ ...list, k ])
    }

    await storage.setItem(k, v)
    return json(k);
  }
}
})()