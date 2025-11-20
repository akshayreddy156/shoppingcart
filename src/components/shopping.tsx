import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { mode, product } from "../types/product";
import AddIcon from "@mui/icons-material/Add";
import CrudItems from "./crudItems.tsx";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteItem from "./deleteItem.tsx";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function Shopping({
  products,
  addToCart,
  removeFromCart,
  deleteItem,
  onAdd,
  onEdit,
  loading,
  error,
}: {
  products: product[];
  onAdd?: (p: Omit<product, "id">) => void;
  onEdit?: (p: product) => void;
  addToCart: (product: product) => void;
  removeFromCart: (product: product) => void;
  deleteItem: (product: product) => void;
  loading?: boolean;
  error?: string | null;
}) {
  const [mode, setMode] = React.useState<mode | "view">("view");
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<product | null>(
    null
  );
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [errorSnackOpen, setErrorSnackOpen] = React.useState(false);
  const [outOfStockProduct, setOutOfStockProduct] = React.useState<product | null>(null);

  const handleOpen = (p?: product, m?: mode) => {
    setSelectedProduct(p || null);
    setOpenAdd(true);
    setMode(m || "add");
  };

  const handleDeleteOpen = (p: product) => {
    setSelectedProduct(p);
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setSelectedProduct(null);
  };

  const handleConfirmDelete = (p: product) => {
    deleteItem(p);
    handleDeleteClose();
  };

  useEffect(() => {
    const outOfStockItem = products.find((p) => p.stock === 0);
    if (outOfStockItem) {
      setOutOfStockProduct(outOfStockItem);
      setSnackOpen(true);
    }
  }, [products]);

  useEffect(() => {
    if (error) {
      setErrorSnackOpen(true);
    }
  }, [error]);

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleErrorSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackOpen(false);
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : products.length === 0 ? (
        <Box
          sx={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="h1" align="center" sx={{ mb: 3 }}>
            Welcome to the Shopping Page!
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ minWidth: 220, py: 2 }}
            onClick={() => {
              handleOpen(undefined, "add");
            }}
          >
            Add your first Item
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
          {/* Headings row */}
          <Grid size={12}>
            <Grid container spacing={2} sx={{ alignItems: "center", mb: 1 }}>
              <Grid size={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Name
                </Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Price
                </Typography>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Stock
                </Typography>
              </Grid>
              <Grid size={2}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, alignSelf: "center" }}
                >
                  Cart
                </Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Amount
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Actions
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {products.map((product) => (
            <Grid size={12} key={product.id} sx={{ mb: 2 }}>
              <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid size={2}>
                  <Typography variant="h6">{product.name}</Typography>
                </Grid>
                <Grid size={2}>
                  <Typography variant="h6">${product.price}</Typography>
                </Grid>
                <Grid size={1}>
                  <Typography variant="h6">{product.stock}</Typography>
                </Grid>
                <Grid
                  size={2}
                  sx={{
                    display: "flex",
                    ml: -1,
                    gap: 1,
                  }}
                >
                  <IconButton
                    onClick={() => addToCart(product)}
                    color="success"
                    disabled={product.stock === 0}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{ alignSelf: "center" }}>
                    {product.quantity}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(product)}
                    disabled={product.quantity === 0}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Grid size={2}>
                  <Typography
                    variant="body1"
                    sx={{ alignSelf: "center", ml: 3 }}
                  >
                    {(product.quantity * product.price).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid size={2} sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={() => handleOpen(product, "view")}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpen(product, "edit")}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteOpen(product)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
      <DeleteItem
        open={openDelete}
        onClose={handleDeleteClose}
        deleteItem={handleConfirmDelete}
        product={selectedProduct}
      />
      <CrudItems
        mode={mode}
        open={openAdd}
        onEdit={onEdit}
        onClose={() => setOpenAdd(false)}
        onAdd={onAdd}
        product={selectedProduct || undefined}
      />
      <Snackbar
        open={snackOpen}
        autoHideDuration={1000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={handleSnackClose}
          sx={{
            bgcolor: "red",
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
          }}
        >
          {outOfStockProduct?.name || "Some items"} is out of stock!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackOpen}
        autoHideDuration={6000}
        onClose={handleErrorSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="error"
          onClose={handleErrorSnackClose}
          sx={{ width: "100%" }}
        >
          {error || "An error occurred"}
        </Alert>
      </Snackbar>
    </>
  );
}
