import { Button, Divider, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

interface IDetailsModal {
  title: string;
  children?: any;
}

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

export default function DetailsModal(props: IDetailsModal) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{}}
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
              <Typography component="p" variant="h4">
                {props.title}
              </Typography>
              <Divider />
            </Stack>

            {props.children}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
