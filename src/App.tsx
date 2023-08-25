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
import { StockKayPage } from "./pages/Stock/kay";
import { PathEnum } from "./enum/path.enum";
import { StockByePage } from "./pages/Stock/bye";
import { StockEquipmentPage } from "./pages/Stock/equipment";
import { StockInstallmentPaymentPage } from "./pages/Stock/InstallmentPaymentPage";
import StockAddPage from "./pages/Stock/add";

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
            path={PathEnum.STOCK_SUM}
            element={
              <StockContextProvider>
                <StockPage />
              </StockContextProvider>
            }
          />
          <Route
            path="/stock/add"
            element={
              <StockContextProvider>
                <StockAddPage />
              </StockContextProvider>
            }
          />
          <Route
            path={PathEnum.STOCK_KAY}
            element={
              <StockContextProvider>
                <StockKayPage />
              </StockContextProvider>
            }
          />
          <Route
            path={PathEnum.STOCK_BYE}
            element={
              <StockContextProvider>
                <StockByePage />
              </StockContextProvider>
            }
          />
          <Route
            path={PathEnum.STOCK_EQUIPMENT}
            element={
              <StockContextProvider>
                <StockEquipmentPage />
              </StockContextProvider>
            }
          />
          <Route
            path={PathEnum.STOCK_INSTALLMENT_PAYMENT}
            element={
              <StockContextProvider>
                <StockInstallmentPaymentPage />
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
