import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MaintenanceMessage from "./batchMaintenance";
import Start from "./chatai/start";
import ChatAi from "./chatai/chatAi";
import Rank from "./rank/rank";
import Dashboard from "./dashboard/dashboard";
import Cart from "./cart/cart";
import ProgressPage from "./common/ui/progresspage";
import Backtest from "./backtest/backtest";
import MaintenancePage from "./maintenance";

function App() {
  return (
    <Router>
      <MaintenanceMessage>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/chat/:userId" element={<ChatAi />} />
          <Route path="/chat" element={<Navigate to="/" replace />} />
          <Route path="/rank/:userId" element={<Rank />} />
          <Route path="/rank" element={<Navigate to="/" replace />} />
          <Route path="/dashboard/:userId/:code" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/cart/:userId" element={<Cart />} />
          <Route path="/cart" element={<Navigate to="/" replace />} />
          <Route path="/loading" element={<ProgressPage />} />
          <Route path="/backtest/:userId" element={<Backtest />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Routes>
      </MaintenanceMessage>
    </Router>
  );
}

export default App;
