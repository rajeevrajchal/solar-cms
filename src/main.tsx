import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import { theme } from "@utils/theme";
import { BreadcrumbProvider } from "@hook/store/use-breadcrumb";
import AppRoutes from "@routes";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import "react-toastify/dist/ReactToastify.css";

import "mantine-datatable/styles.layer.css";

import "./index.css";

import { AuthProvider } from "@hook/store/use-auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always",
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query?.meta?.errorMessage) {
        toast.error((query?.meta?.errorMessage as string) || "");
      } else {
        toast.error(error?.message || "Something went wrong");
      }
    },
  }),
});

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <MantineProvider theme={theme}>
          <AuthProvider>
            <BreadcrumbProvider>
              <AppRoutes />
            </BreadcrumbProvider>
          </AuthProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(app);
