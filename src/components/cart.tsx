import { Typography, Button } from "@mui/material";
import { product } from "../types/product";

export default function cart(props: {
  products: product[];
  handleReset: () => void;
}) {
  // Calculate grand total across all products
  const grandTotal = props.products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );

  return (
    <>
      {grandTotal === 0 ? null : (
        <div
          style={{
            position: "fixed",
            height: "20px",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#1976d2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 16px",
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              props.handleReset();
            }}
          >
            Reset
          </Button>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "white" }}>
            Grand Total: ${grandTotal.toFixed(2)}
          </Typography>
        </div>
      )}
    </>
  );
}
