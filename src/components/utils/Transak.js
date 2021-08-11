import React, { useEffect } from "react";
import { Modal, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
function Transak({ onClose }) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keyup", onEsc);
    return () => {
      document.removeEventListener("keyup", onEsc);
    };
  }, []);
  return (
    <Modal open={true}>
      <div className="crycto-transak-container">
        <Alert className="crycto-transak-alert" severity="warning">
          <Typography
            style={{
              fontSize: "1.1rem",
              textAlign: "center",
              fontFamily: "var(--crycto-font-montserrat)",
            }}
          >
            Make sure to switch to Polygon (Previously Matic) Network
          </Typography>
        </Alert>
        <iframe
          className="crycto-transak"
          title="Transak"
          src="https://global.transak.com/"
        />
        <CloseIcon
          className="crycto-transak-close"
          fontSize="inherit"
          onClick={onClose}
        />
      </div>
    </Modal>
  );
}

export default Transak;
