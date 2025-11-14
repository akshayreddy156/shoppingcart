import { Grid, Typography, Button } from "@mui/material";
import { product } from "../types/product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function Shopping({
  products,
  addToCart,
  removeFromCart,
}: {
  products: product[];
  addToCart: (product: product) => void;
  removeFromCart: (product: product) => void;
}) {
  return (
    <>
      <Typography variant="h3" component="h1" align="center" sx={{ mt: 3 }}>
        Welcome to the Shopping Page!
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        {/* Headings row */}
        <Grid size={12}>
          <Grid container spacing={2} sx={{ alignItems: "center", mb: 1 }}>
            <Grid size={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Name
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Price
              </Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Stock
              </Typography>
            </Grid>
            <Grid size={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Actions
              </Typography>
            </Grid>
            <Grid size={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Amount
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {products.map((product) => (
          <Grid size={12} key={product.id} sx={{ mb: 2 }}>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              {/* Name - 3 grids */}
              <Grid size={3}>
                <Typography variant="h6">{product.name}</Typography>
              </Grid>
              {/* Price - 3 grids */}
              <Grid size={3}>
                <Typography variant="h6">${product.price}</Typography>
              </Grid>
              <Grid size={3}>
                <Typography variant="h6">{product.stock}</Typography>
              </Grid>
              {/* Buttons - 2 grids */}
              <Grid
                size={2}
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-start",
                  ml: -4,
                }}
              >
                <Button color="primary" onClick={() => addToCart(product)}>
                  <AddIcon fontSize="small" />
                </Button>
                <Typography variant="body1" sx={{ alignSelf: "center" }}>
                  {product.quantity}
                </Typography>
                <Button
                  aria-label="reduce"
                  color="error"
                  onClick={() => removeFromCart(product)}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
              </Grid>
              <Grid size={1}>
                <Typography variant="body1" sx={{ alignSelf: "center", ml: 4 }}>
                  ${product.quantity * product.price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
