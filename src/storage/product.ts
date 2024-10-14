import { json } from "react-router-dom";
import IDBStorage from 'idbstorage';
import { Product } from "../types/Product";
import { parse } from "../network/response";

const storage = new IDBStorage({ name: 'choice', _storeName: 'product' });

export const store = (() => {
  storage.getItem(`Ids`).then((ids) => {
    if (!Array.isArray(ids)) {
      storage.setItem('Ids', []);
    }
  })

  storage.getItem(`DeletedIds`).then((ids) => {
    if (!Array.isArray(ids)) {
      storage.setItem('DeletedIds', []);
    }
  })

  return {
    get: async (k: string) => {
      const product = await parse(json(await storage.getItem(k))) as Product

      return { ...product }
    },
    ids: async () => json([...await storage.getItem(`Ids`)]),
    set: async (k, v: Product) => {
      const existingIds = await storage.getItem(`Ids`);
      const deletedIds = await storage.getItem('DeletedIds');

      if (Array.isArray(existingIds) && Array.isArray(deletedIds)) {
        if (!existingIds.includes(k) && !deletedIds.includes(k)) {
          storage.setItem(`Ids`, [...existingIds, k])
        } else if (deletedIds.includes(k)) {
          storage.setItem('DeletedIds', deletedIds.filter((id) => id === k))
        }

        await storage.setItem(k, v)
        return json(k);
      } else if (!Array.isArray(existingIds)) {
        throw new Error('Missing Id Index.');
      } else if (!Array.isArray(deletedIds)) {
        throw new Error('Missing DeletedId Index.');
      }


    },
    delete: async (k) => {
      const ids = [...await storage.getItem('Ids') ?? []].filter((id) => id !== k);
      const deleted = [...await storage.getItem('DeletedIds'), k];

      await storage.setItem('Ids', ids);
      await storage.setItem('Deleted', deleted);

      return storage.removeItem(k);
    }
  }
})()