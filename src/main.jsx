import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./Routes/Router";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Providers/AuthProvider";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="mx-auto overflow-hidden font-exo-2">
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <React.StrictMode>
              <RouterProvider router={router} />
            </React.StrictMode>
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </div>
);
