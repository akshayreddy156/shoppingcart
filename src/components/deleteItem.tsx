import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { product } from "../types/product";

export default function DeleteItem({
  open,
  onClose,
  deleteItem,
  product,
}: {
  open: boolean;
  onClose: () => void;
  deleteItem: (p: product) => void;
  product: product | null;
}) {
  const handleDeleteItem = () => {
    if (product) {
      console.log("Deleting item:", product);
      deleteItem(product);
      onClose();
    }
    onClose();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete item: {product?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDeleteItem} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
