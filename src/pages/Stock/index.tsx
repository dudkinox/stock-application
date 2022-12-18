import NavBarCommon from "../../common/NavBar";
import SidebarCommon from "../../common/Sidebar";
import Stock from "../../common/Stock";

export default function StockPage() {
  return (
    <div className="wrapper">
      <NavBarCommon />
      <SidebarCommon />
      <Stock />;
    </div>
  );
}
