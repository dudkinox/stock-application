import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/Stock";
import NavBarCommon from "./common/NavBar";
import SidebarCommon from "./common/Sidebar";
import CustomerPage from "./pages/Customer";
import { StockContextProvider } from "./contexts/StockContext";
import { CustomerContextProvider } from "./contexts/CustomerContext";
import { UserContextProvider } from "./contexts/ManageUserContext";
import ManageUser from "./pages/ManageUser";
import LoginPage from "./pages/LoginPage";
import { useContext, useEffect } from "react";
import { AppContext } from "./contexts";
import { PermissionEnum } from "./enum/permission.enum";
import { DashBoardContextProvider } from "./contexts/DashBoardContext";
import DataStudio from "./pages/DataStudio";

export default function App() {
  const { isLogin, typeUser } = useContext(AppContext);

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
          <Route
            path="/"
            element={
              <DashBoardContextProvider>
                <Dashboard />
              </DashBoardContextProvider>
            }
          />
          <Route
            path="/data-studio"
            element={
              <DashBoardContextProvider>
                <DataStudio />
              </DashBoardContextProvider>
            }
          />
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
              <StockContextProvider>
                <CustomerContextProvider>
                  <CustomerPage />
                </CustomerContextProvider>
              </StockContextProvider>
            }
          />
          {typeUser === PermissionEnum.ADMIN && (
            <Route
              path="/manage-user"
              element={
                <UserContextProvider>
                  <ManageUser />
                </UserContextProvider>
              }
            />
          )}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
