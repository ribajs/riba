import { OrderSyncProgress } from "./order";
import { ProductSyncProgress } from "./product";
import { SyncOptions } from "./options";

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
