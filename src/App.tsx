import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/Stock";
import NavBarCommon from "./common/NavBar";
import SidebarCommon from "./common/Sidebar";

export default function App() {
  return (
    <>
      <NavBarCommon />
      <SidebarCommon />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stock" element={<StockPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
