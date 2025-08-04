"use client";

import { Alert, Snackbar } from "@mui/material";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type SnackbarSeverity = "success" | "error" | "info" | "warning";

type SnackbarContextType = {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("info");

  const showSnackbar = useCallback(
    (msg: string, type: SnackbarSeverity = "info") => {
      setMessage(msg);
      setSeverity(type);
      setOpen(true);
    },
    []
  );

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={severity} onClose={handleClose} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
