import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { mode, product } from "../types/product";

type Props = {
  mode: mode;
  open: boolean;
  onClose: () => void;
  onAdd?: (p: Omit<product, 'id'>) => void;
  onEdit?: (p: product) => void;
  product?: product;
};

export default function CrudItems({
  open,
  onClose,
  onAdd,
  onEdit,
  mode,
  product,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [readOnly, setReadOnly] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    stock: "",
  });
  useEffect(() => {
    if (product && (mode === "edit" || mode === "view")) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description || "");
    } else {
      // Reset fields for add mode
      setName("");
      setPrice(0);
      setStock(0);
      setDescription("");
    }
  }, [product, mode]);
  useEffect(() => {
    if (mode === "view") {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, [mode]);

  const validate = () => {
    const newErrors = { name: "", price: "", stock: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (Number(price) <= 0) {
      newErrors.price = "Price must be greater than 0";
      isValid = false;
    }

    if (Number(stock) <= 0 || !Number.isInteger(Number(stock))) {
      newErrors.stock = "Stock cannot be 0 or non-integer";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  function handleSubmit() {
    if (mode === "add") {
      handleAdd();
    } else if (mode === "edit") {
      handleEdit();
    } else {
      onClose();
    }
  }

  const handleEdit = () => {
    if (!validate()) return;
    // Implement edit functionality here
    const updatedProduct: product = {
      id: product ? product.id : Date.now(),
      name: name || "Untitled",
      price: price || 0,
      description: description || "",
      quantity: product?.quantity || 0,
      stock: stock || 0,
    };
    if (onEdit) onEdit(updatedProduct);
    onClose();
  };

  const handleAdd = () => {
    if (!validate()) return;

    const newProduct: Omit<product, 'id'> = {
      name: name || "Untitled",
      price: Number(price) || 0,
      description: description || "",
      quantity: 0,
      stock: Number(stock) || 0,
    };
    if (onAdd) onAdd(newProduct);
    setName("");
    setPrice(0);
    setStock(0);
    setDescription("");
    setErrors({ name: "", price: "", stock: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pt: 3, fontWeight: "bold" }}>
        {mode === "edit" ? "Edit" : mode === "view" ? "View" : "Add New"} Item
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              readOnly: readOnly,
            },
          }}
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              readOnly: readOnly,
            },
          }}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          error={!!errors.price}
          helperText={errors.price}
          slotProps={{
            htmlInput: { min: 0, step: "any" },
            input: {
              readOnly: readOnly,
            },
          }}
        />
        <TextField
          label="Stock"
          type="number"
          fullWidth
          margin="normal"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          required
          error={!!errors.stock}
          helperText={errors.stock}
          slotProps={{
            htmlInput: { min: 0, step: 1 },
            input: {
              readOnly: readOnly,
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {mode === "view" ? null : (
          <Button variant="contained" onClick={handleSubmit}>
            {mode === "edit" ? "Update" : "Add"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
