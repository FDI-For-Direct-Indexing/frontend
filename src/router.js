import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ChatAi from "./chatai/chatAi";
import Rank from "./rank/rank";
import Dashboard from "./dashboard/dashboard";
import Cart from "./cart/cart";
import ProgressPage from "./common/ui/progresspage";
import Backtest from "./backtest/backtest";
import Start from "./chatai/start";
import MaintenancePage from "./maintenance"; // 점검 페이지 추가

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
  { path: "/maintenance", element: <MaintenancePage />, index: true }, // 점검 페이지 경로 추가
]);

export default router;
