import { json } from "react-router-dom";
import IDBStorage from 'idbstorage';
import { ProductItem } from "../types/ProductItem";
import { parse } from "../network/response";
import { count } from "console";

const storage = new IDBStorage({ name: 'inventory' });

export const store = (() => {
  storage.getItem(`Ids`).then((ids) => {
    if (!Array.isArray(ids)) {
      storage.setItem('Ids', []);
    }
  })

  return {
    product: {
      count: async (k) => parse(json([
        ...(await storage.getItem(k) ?? [])
      ].length))
    },
    get: async (k: string) => parse(json(await storage.getItem(k))),
    ids: async () => json([...await storage.getItem(`Ids`)]),
    set: async (k, v: ProductItem) => {
      if (!await storage.getItem(k)) {
        const list = [] = await storage.getItem(`Ids`)
        storage.setItem(`Ids`, [...list, k])
      }

      await storage.setItem(k, v)
      return json(k);
    }
  }
})();