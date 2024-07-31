import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ChatAi from "./chatai/chatAi";
import Rank from "./rank/rank";
import Dashboard from "./dashboard/dashboard";
import Cart from "./cart/cart";
import ProgressPage from "./common/ui/progresspage";
import DashedChart from "./rank/components/parallelPlot/dashedChart";
import Backtest from "./backtest/backtest";
import Start from "./chatai/start";

const router = createBrowserRouter([
  { path: "/", element: <Start />, index: true },
  { path: "/chat/:userId", element: <ChatAi />, index: true },
  { path: "/chat", element: <Navigate to="/" replace />, index: true },
  { path: "/rank/:userId", element: <Rank />, index: true },
  { path: "/rank", element: <Navigate to="/" replace />, index: true },
  { path: "/dashboard/:userId/:code", element: <Dashboard />, index: true },
  { path: "/dashboard", element: <Navigate to="/" replace />, index: true },
  { path: "/cart/:userId", element: <Cart />, index: true },
  { path: "/cart", element: <Navigate to="/" replace />, index: true },
  { path: "/loading", element: <ProgressPage />, index: true },
  { path: "/backtest/:userId", element: <Backtest />, index: true },
]);

export default router;
