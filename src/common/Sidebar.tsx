export default function SidebarCommon() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <a href="/" className="nav-link active">
                <i className="nav-icon fas fa-home" />
                <p>หน้าเเรก</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/stock" className="nav-link">
                <i className="nav-icon fas fa-shopping-cart" />
                <p>คลังสินค้า</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
