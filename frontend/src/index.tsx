import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query"; // React Query
import { RecoilRoot } from "recoil"; // Recoil
import router from "./routes";
import Loading from "./components/common/Loading";

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </QueryClientProvider>
  </RecoilRoot>
);

reportWebVitals();
