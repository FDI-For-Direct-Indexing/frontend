import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ChatAi from "./chatai/chatAi";
import Rank from "./rank/rank";
import Dashboard from "./dashboard/dashboard";
import Cart from "./cart/cart";
import ProgressPage from "./common/ui/progresspage";

const router = createBrowserRouter([
  { path: "/", element: <ChatAi />, index: true },
  { path: "/rank", element: <ChatAi />, index: true },
  { path: "/rank/:userId", element: <Rank />, index: true },
  { path: "/dashboard/:userId/:code", element: <Dashboard />, index: true },
  { path: "/cart/:userId", element: <Cart />, index: true },
  { path: "/loading", element: <ProgressPage />, index: true },
]);

export default router;
