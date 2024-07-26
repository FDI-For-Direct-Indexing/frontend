import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ChatAi from "./chatai/chatAi";
import Rank from "./rank/rank";
import Dashboard from "./dashboard/dashboard";
import Cart from "./cart/cart";

const router = createBrowserRouter([
  { path: "/", element: <ChatAi />, index: true },
  { path: "/rank", element: <Rank />, index: true },
  { path: "/dashboard/:code", element: <Dashboard />, index: true },
  { path: "/cart/:userId", element: <Cart />, index: true },
]);

export default router;
