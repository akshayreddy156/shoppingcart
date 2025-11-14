import React from "react";
import "./App.css";
import Navbar from "./components/navbar.tsx";
import Shopping from "./components/shopping.tsx";
import { product } from "./types/product";
import Cart from "./components/cart.tsx";

function App() {
  let products: product[] = [
    {
      id: 1,
      name: "Laptop",
      price: 999.99,
      description: "A high-performance laptop",
      stock: 10,
      quantity: 0,
    },
    {
      id: 2,
      name: "Smartphone",
      price: 499.99,
      description: "A latest model smartphone",
      quantity: 0,
      stock: 15,
    },
  ];
  const [productList, setProductList] = React.useState<product[]>(products);
  const addtoCart = (product: product) => {
    const updatedProducts = productList.map((p) => {
      if (p.id === product.id && p.stock > 0) {
        return {
          ...p,
          quantity: p.quantity + 1,
          stock: p.stock - 1,
        };
      }
      return p;
    });
    setProductList(updatedProducts);
  };

  const removeFromCart = (product: product) => {
    const updatedProducts = productList.map((p) => {
      if (p.id === product.id && p.quantity > 0) {
        return {
          ...p,
          quantity: p.quantity - 1,
          stock: p.stock + 1,
        };
      }
      return p;
    });
    setProductList(updatedProducts);
  };

  const handleReset = () => {
    const resetProducts = productList.map((p) => ({
      ...p,
      stock: p.stock + p.quantity,
      quantity: 0,
    }));
    setProductList(resetProducts);
  };

  const handleAddProduct = (newProduct: product) => {
    setProductList((prev) => [...prev, newProduct]);
  };

  const handleEditProduct = (updatedProduct: product) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (deletedProduct: product) => {
    setProductList((prev) => [
      ...prev.filter((p) => p.id !== deletedProduct.id),
    ]);
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
      />
      <Cart products={productList} handleReset={handleReset} />
    </div>
  );
}

export default App;
