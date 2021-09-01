import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  IconButton,
  Link,
  Slide,
  Snackbar,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import useMaticPrice from "../hooks/useMaticPrice";
import { Alert } from "@material-ui/lab";
import { useTheme } from "./ThemeProvider";
import { chains, NETWORK } from "../web3";

const OnChainContext = createContext({});

function OnChainProvider({ children }) {
  const price = useMaticPrice();

  const [snackPack, setSnackPack] = useState([]);
  const [messageInfo, setMessageInfo] = useState();
  const [open, setOpen] = useState(false);
  const notifyNewTransaction = useCallback(
    (message, hash) => {
      setSnackPack((pack) => [...pack, { message, hash }]);
    },
    [setSnackPack]
  );
  const notifyTransactionStatus = useCallback(
    (message, status, hash) => {
      setSnackPack((pack) => [...pack, { message, status, hash }]);
    },
    [setSnackPack]
  );
  const notify = useCallback(
    (message, status) => {
      setSnackPack((pack) => [...pack, { message, status }]);
    },
    [setSnackPack]
  );
  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
      setMessageInfo();
    }
  }, [snackPack, messageInfo, open]);

  return (
    <OnChainContext.Provider
      value={{ price, notify, notifyNewTransaction, notifyTransactionStatus }}
    >
      {children}

      {open && (
        <TransactionSnackBar
          snack={messageInfo}
          open={open}
          onClose={() => {
            setOpen(false);
            setMessageInfo();
          }}
        />
      )}
    </OnChainContext.Provider>
  );
}

const TransactionSnackBar = ({ snack, open, onClose }) => {
  const { isLightTheme } = useTheme();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={onClose}
      autoHideDuration={6000}
      message={
        <Typography
          style={{ fontSize: "1.2rem", fontFamily: "Montserrat-Regular" }}
        >
          {snack?.message}
        </Typography>
      }
      action={
        <>
          <OpenInNewIcon
            onClick={() =>
              window.open(
                `https://polygonscan.com/tx/${snack?.hash}`,
                "_blank",
                "noopener"
              )
            }
          />

          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </>
      }
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
      key={`transaction-${snack?.status}-${snack?.hash}`}
    >
      <Alert
        severity={snack?.status ?? "info"}
        style={{
          filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.1))",
          zIndex: 99999,
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: isLightTheme ? "white" : "black",
          color: isLightTheme ? "black" : "white",
        }}
      >
        <CloseIcon
          fontSize="medium"
          style={{
            position: "absolute",
            top: 8,
            right: 10,
            cursor: "pointer",
          }}
          onClick={onClose}
        />
        <Typography
          style={{
            fontFamily: "Montserrat-Regular",
            fontSize: "1.1rem",
            padding: "0 2rem 0 0",
            maxWidth: 250,
          }}
        >
          {snack?.message}

          <br />
          {snack?.hash && (
            <Link
              href="#"
              onClick={() =>
                window.open(
                  `${chains[NETWORK].networkObject.explorer}tx/${snack?.hash}`,
                  "_blank",
                  "noopener"
                )
              }
            >
              Click here to view in block explorer
            </Link>
          )}
        </Typography>
      </Alert>
    </Snackbar>
  );
};
export const useOnChainContext = () => useContext(OnChainContext);

export default OnChainProvider;
