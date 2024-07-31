import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ChatAi from "./chatai/chatAi";
import Rank from "./rank/rank";
import Dashboard from "./dashboard/dashboard";
import Cart from "./cart/cart";
import ProgressPage from "./common/ui/progresspage";
<<<<<<< Updated upstream
=======
import Backtest from "./backtest/backtest";
>>>>>>> Stashed changes

const router = createBrowserRouter([
  { path: "/", element: <ChatAi />, index: true },
  { path: "/rank/:userId", element: <Rank />, index: true },
  { path: "/dashboard/:userId/:code", element: <Dashboard />, index: true },
  { path: "/cart/:userId", element: <Cart />, index: true },
  { path: "/loading", element: <ProgressPage />, index: true },
]);

export default router;
