import { RouterProvider } from "react-router-dom";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
