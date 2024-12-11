import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import DoctorContextProvider from "./context/DoctorsContext.jsx";
import AppcontextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppcontextProvider>
          <App />
        </AppcontextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
