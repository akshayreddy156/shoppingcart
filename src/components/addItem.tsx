import React, { useState } from "react";
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
import { product } from "../types/product";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd?: (p: product) => void;
};

export default function AddItem({ open, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    stock: "",
  });

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
      newErrors.stock = "Stock cannot be negative or non-integer";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (!validate()) return;

    const newProduct: product = {
      id: Date.now(),
      name: name || "Untitled",
      price: Number(price) || 0,
      description: "",
      quantity: 0,
      stock: Number(stock) || 0,
    };
    if (onAdd) onAdd(newProduct);
    // reset and close
    setName("");
    setPrice(0);
    setStock(0);
    setErrors({ name: "", price: "", stock: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pt: 3, fontWeight: "bold" }}>Add New Item</DialogTitle>
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
          slotProps={{ inputLabel: { shrink: true } }}
          required
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
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
