import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ChatAi from "./chatai/chatAi";
import Rank from "./rank/rank";
import Dashboard from "./dashboard/dashboard";
import Cart from "./cart/cart";
import ProgressPage from "./common/ui/progresspage";
import DashedChart from "./rank/components/parallelPlot/dashedChart";

const router = createBrowserRouter([
  { path: "/", element: <ChatAi />, index: true },
  { path: "/rank", element: <Rank />, index: true },
  { path: "/dashboard/:code", element: <Dashboard />, index: true },
  { path: "/cart/:userId", element: <Cart />, index: true },
  { path: "/loading", element: <ProgressPage />, index: true },
  { path: "/:code", element: <Dashboard />, index: true },
]);

export default router;
