export type product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  quantity: number;
  stock: number;
};
export type mode = "add" | "view" | "edit";
