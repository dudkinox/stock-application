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
import IncomePage from "./pages/Income";
import { IncomeContextProvider } from "./contexts/IncomeContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import LoadingCommon from "./common/Loading";

export default function App() {
  const { isLogin, isLoading, majorUser } = useContext(AppContext);

  useEffect(() => {
    if (isLogin === "" && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingCommon />}
      {!isLoading && (
        <>
          <NavBarCommon /> <SidebarCommon />
        </>
      )}
      <BrowserRouter>
        <Routes>
          {majorUser === "admin" && (
            <>
              <Route
                path="/"
                element={
                  <DashboardProvider>
                    <Dashboard />
                  </DashboardProvider>
                }
              />
              <Route
                path="/manage-user"
                element={
                  <UserContextProvider>
                    <ManageUser />
                  </UserContextProvider>
                }
              />
              <Route
                path="/income-list"
                element={
                  <IncomeContextProvider>
                    <IncomePage />
                  </IncomeContextProvider>
                }
              />
            </>
          )}
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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
