import api from "./api.ts";
import { product } from "../types/product";

// API service for product operations
const productService = {
  // Get all products
  getAllProducts: async (): Promise<product[]> => {
    const response = await api.get<product[]>("/products");
    return response.data;
  },

  // Create a new product
  createProduct: async (product: Omit<product, "id">): Promise<product> => {
    const response = await api.post<product>("/products", product);
    return response.data;
  },

  // Update an existing product
  updateProduct: async (
    id: number,
    product: Partial<product>
  ): Promise<product> => {
    const response = await api.put<product>(`/products/${id}`, product);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Add product to cart (decrement stock, increment quantity)
  addToCart: async (id: number): Promise<product> => {
    const response = await api.post<product>(`/products/cart/add/${id}`);
    return response.data;
  },

  // Remove product from cart (increment stock, decrement quantity)
  removeFromCart: async (id: number): Promise<product> => {
    const response = await api.post<product>(`/products/cart/remove/${id}`);
    return response.data;
  },

  // Reset cart (set all quantities to 0, restore stock)
  resetCart: async (): Promise<product[]> => {
    const response = await api.post<product[]>("/products/cart/reset");
    return response.data;
  },
};

export default productService;
