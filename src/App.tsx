import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/Stock";
import NavBarCommon from "./common/NavBar";
import SidebarCommon from "./common/Sidebar";
import CustomerPage from "./pages/Customer";
import { StockContextProvider } from "./contexts/StockContext";
import { CustomerContextProvider } from "./contexts/CustomerContext";
import ManageUser from "./pages/ManageUser";
import LoginPage from "./pages/LoginPage";
import { useContext, useEffect } from "react";
import { AppContext } from "./contexts";

export default function App() {
  const { isLogin } = useContext(AppContext);

  useEffect(() => {
    if (isLogin === "" && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
