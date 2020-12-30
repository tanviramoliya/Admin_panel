import React from "react";
import { Dialog, Button } from "@material-ui/core";

const ConfirmationDialog = ({
  open,
  onNoClick,
  message,
  title,
  onYesClick,
  toggle
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={toggle}
    >
      <div className="pt-24 px-20 pb-8">
        <h4 className="capitalize">{title}</h4>
        <p>{message}</p>
        <div className="flex flex-space-between pt-8">
          <Button onClick={onYesClick} variant="contained" color="primary">
            Yes
          </Button>
          <Button
            onClick={onNoClick}
            variant="contained"
            color="secondary"
          >
            No
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
