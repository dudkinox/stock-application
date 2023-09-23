import { useContext } from "react";
import { AppContext } from "../contexts";
import { PathEnum } from "../enum/path.enum";

export default function SidebarCommon() {
  const { pathUrl, isLogin, majorUser } = useContext(AppContext);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="https://img.icons8.com/color/48/null/admin-settings-male.png"
              className="img-circle elevation-2"
              aria-hidden="true"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#admin" className="d-block">
              Admin
            </a>
          </div>
        </div>
        {isLogin !== "" && (
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {majorUser === "admin" ? (
                <li className="nav-item">
                  <a
                    href="/"
                    className={`nav-link ${
                      pathUrl === PathEnum.DASHBOARD ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-home" />
                    <p>หน้าเเรก</p>
                  </a>
                </li>
              ) : null}
              <li className="nav-item menu-open">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    คลังสินค้า
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {/* <li className="nav-item">
                    <a
                      href={PathEnum.STOCK_SUM}
                      className={`nav-link ${
                        pathUrl === PathEnum.STOCK_SUM ? "active" : ""
                      }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>ภาพรวม</p>
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a
                      href={PathEnum.STOCK_KAY}
                      className={`nav-link ${
                        pathUrl === PathEnum.STOCK_KAY ? "active" : ""
                      }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>ขาย</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href={PathEnum.STOCK_BYE}
                      className={`nav-link ${
                        pathUrl === PathEnum.STOCK_BYE ? "active" : ""
                      }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>ซื้อ</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href={PathEnum.STOCK_EQUIPMENT}
                      className={`nav-link ${
                        pathUrl === PathEnum.STOCK_EQUIPMENT ? "active" : ""
                      }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>อุปกรณ์</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href={PathEnum.STOCK_INSTALLMENT_PAYMENT}
                      className={`nav-link ${
                        pathUrl === PathEnum.STOCK_INSTALLMENT_PAYMENT
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="far fa-circle nav-icon" />
                      <p>ผ่อน</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a
                  href="/customer"
                  className={`nav-link ${
                    pathUrl === PathEnum.CUSTOMER ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fas fa-users" />
                  <p>ข้อมูลลูกค้า</p>
                </a>
              </li>
              {majorUser === "admin" ? (
                <li className="nav-item">
                  <a
                    href="/manage-user"
                    className={`nav-link ${
                      pathUrl === PathEnum.MANAGE_USER ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-user-plus" />
                    <p>จัดการผู้ใช้</p>
                  </a>
                </li>
              ) : null}
              {majorUser === "admin" ? (
                <li className="nav-item">
                  <a
                    href="/income-list"
                    className={`nav-link ${
                      pathUrl === PathEnum.INCOME_LIST ? "active" : ""
                    }`}
                  >
                    <i className="nav-icon fas fa-book" />
                    <p>รายรับ-รายจ่าย</p>
                  </a>
                </li>
              ) : null}
              <li className="nav-item">
                <a href="/app/Stock.msi" className={`nav-link`}>
                  <img
                    className="nav-icon"
                    src="https://img.icons8.com/dusk/30/download--v1.png"
                    alt="logout"
                  />
                  <p>download</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/login"
                  className={`nav-link ${
                    pathUrl === PathEnum.LOGOUT ? "active" : ""
                  }`}
                  onClick={() => {
                    sessionStorage.clear();
                  }}
                >
                  <img
                    className="nav-icon"
                    src="https://img.icons8.com/dusk/30/null/logout-rounded.png"
                    alt="logout"
                  />
                  <p>ออกจากระบบ</p>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </aside>
  );
}
