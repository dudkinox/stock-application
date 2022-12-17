import MainContent from "../../common/MainContent";
import NavBarCommon from "../../common/NavBar";
import SidebarCommon from "../../common/Sidebar";

export default function Dashboard() {
  return (
    <div className="wrapper">
      <NavBarCommon />
      <SidebarCommon />
      <MainContent />
    </div>
  );
}
