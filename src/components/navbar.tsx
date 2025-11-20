import React from "react";
import { AppBar, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CrudItems from "./crudItems.tsx";
import { product } from "../types/product";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
export default function Navbar({ onAdd }: { onAdd?: (p: Omit<product, 'id'>) => void }) {
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleOpen = () => {
    setOpenAdd(true);
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          px: "5px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>
          A<LowPriorityIcon />
          RT
        </h3>
        <Button sx={{ color: "inherit" }} onClick={handleOpen}>
          <AddCircleIcon sx={{ paddingRight: 1 }} />
          Add Item
        </Button>
      </AppBar>

      <CrudItems
        mode="add"
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={onAdd}
      />
    </>
  );
}
