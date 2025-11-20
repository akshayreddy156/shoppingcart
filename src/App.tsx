import React from "react";
import "./App.css";
import Navbar from "./components/navbar.tsx";
import Shopping from "./components/shopping.tsx";
import { product } from "./types/product";
import Cart from "./components/cart.tsx";
import productService from "./services/productService.ts";

function App() {
  const [productList, setProductList] = React.useState<product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch products from backend on component mount
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await productService.getAllProducts();
        setProductList(products);
      } catch (err: any) {
        console.error("Failed to fetch products:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load products. Please check if the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const addtoCart = async (product: product) => {
    try {
      const updatedProduct = await productService.addToCart(product.id);
      setProductList((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } catch (err: any) {
      console.error("Failed to add to cart:", err);
      setError(err.response?.data?.message || "Failed to add item to cart");
    }
  };

  const removeFromCart = async (product: product) => {
    try {
      const updatedProduct = await productService.removeFromCart(product.id);
      setProductList((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } catch (err: any) {
      console.error("Failed to remove from cart:", err);
      setError(
        err.response?.data?.message || "Failed to remove item from cart"
      );
    }
  };

  const handleReset = async () => {
    try {
      const resetProducts = await productService.resetCart();
      setProductList(resetProducts);
    } catch (err: any) {
      console.error("Failed to reset cart:", err);
      setError(err.response?.data?.message || "Failed to reset cart");
    }
  };

  const handleAddProduct = async (newProduct: Omit<product, "id">) => {
    try {
      const createdProduct = await productService.createProduct(newProduct);
      setProductList((prev) => [...prev, createdProduct]);
    } catch (err: any) {
      console.error("Failed to add product:", err);
      setError(err.response?.data?.message || "Failed to add product");
      throw err; // Re-throw to let the component handle it
    }
  };

  const handleEditProduct = async (updatedProduct: product) => {
    try {
      const updated = await productService.updateProduct(
        updatedProduct.id,
        updatedProduct
      );
      setProductList((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    } catch (err: any) {
      console.error("Failed to update product:", err);
      setError(err.response?.data?.message || "Failed to update product");
      throw err; // Re-throw to let the component handle it
    }
  };

  const handleDeleteProduct = async (deletedProduct: product) => {
    try {
      await productService.deleteProduct(deletedProduct.id);
      setProductList((prev) => prev.filter((p) => p.id !== deletedProduct.id));
    } catch (err: any) {
      console.error("Failed to delete product:", err);
      setError(err.response?.data?.message || "Failed to delete product");
      throw err; // Re-throw to let the component handle it
    }
  };

  return (
    <div>
      <Navbar onAdd={handleAddProduct} />
      <Shopping
        onAdd={handleAddProduct}
        products={productList}
        addToCart={addtoCart}
        removeFromCart={removeFromCart}
        deleteItem={handleDeleteProduct}
        onEdit={handleEditProduct}
        loading={loading}
        error={error}
      />
      <Cart products={productList} handleReset={handleReset} />
    </div>
  );
}

export default App;
