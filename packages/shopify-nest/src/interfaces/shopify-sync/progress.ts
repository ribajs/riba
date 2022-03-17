import { OrderSyncProgress } from "./order.js";
import { ProductSyncProgress } from "./product.js";
import { SyncOptions } from "./options.js";

export interface SyncProgress {
  shop: string;
  options: SyncOptions;
  orders?: OrderSyncProgress;
  products?: ProductSyncProgress;
  createdAt: Date;
  updatedAt: Date;
  state: "running" | "failed" | "cancelled" | "success" | "starting" | "ending";
  lastError: string | null;
}
