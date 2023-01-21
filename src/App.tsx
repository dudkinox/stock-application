import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/Stock";
import NavBarCommon from "./common/NavBar";
import SidebarCommon from "./common/Sidebar";
import CustomerPage from "./pages/Customer";
import { StockContextProvider } from "./contexts/StockContext";
import { CustomerContextProvider } from "./contexts/CustomerContext";
import ManageUser from "./pages/ManageUser/indes";

export default function App() {
  return (
    <>
      <NavBarCommon />
      <SidebarCommon />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/stock"
            element={
              <StockContextProvider>
                <StockPage />
              </StockContextProvider>
            }
          />
          <Route
            path="/customer"
            element={
              <CustomerContextProvider>
                <CustomerPage />
              </CustomerContextProvider>
            }
          />
          <Route path="/manage-user" element={<ManageUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
