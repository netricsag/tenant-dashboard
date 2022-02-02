import {
  Box,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useContext, useEffect, useState } from "react";
import { TenantContext } from "../../App";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",

  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  overflow: "scroll",
  maxHeight: "75vh",
  minWidth: {
    xs: "85vw",
    sm: "85vw",
    md: "auto",
    lg: "auto",
    xl: "auto",
  },
  p: 4,
  "::-webkit-scrollbar": {
    width: "0px",
    background: "transparent",
  },
};

export default function FloatingTenantChange() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tenants, setTenants] = useState([]);
  const tenantContext = useContext(TenantContext);

  const TenantItems = tenants.map((tenantName) => {
    return (
      <ListItem disablePadding key={tenantName}>
        <ListItemButton
          onClick={() => {
            tenantContext.updateSelectedTenant(tenantName);
            handleClose();
          }}
        >
          <ListItemText primary={tenantName} />
        </ListItemButton>
      </ListItem>
    );
  });

  useEffect(() => {
    setTenants(tenantContext.tenantList);
  }, [tenantContext.tenantList]);

  return (
    <>
      <Fab
        size="medium"
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          visibility: {
            xs: "visible",
            sm: "visible",
            md: "hidden",
            lg: "hidden",
            xl: "hidden",
          },
          display: {
            xs: "grid",
            sm: "grid",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        onClick={handleOpen}
      >
        <CompareArrowsIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            overflowX: "hidden",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Stack spacing={1}>
              <Typography component="p" variant="h6">
                Tenant wählen
              </Typography>
              <Divider />
            </Stack>
            <List>{TenantItems}</List>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
