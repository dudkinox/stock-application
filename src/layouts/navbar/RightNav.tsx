import React from "react";

export default function RightNav() {
  return (
    <ul className="navbar-nav ml-auto">
      {/* Navbar Search */}
      <li className="nav-item">
        <a
          className="nav-link"
          data-widget="navbar-search"
          href="#test"
          role="button"
        >
          <i className="fas fa-search" />
        </a>
        <div className="navbar-search-block">
          <form className="form-inline">
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
                <button
                  className="btn btn-navbar"
                  type="button"
                  data-widget="navbar-search"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#test">
          <i className="far fa-envelope" />
          <span className="badge badge-danger navbar-badge">3</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#test" className="dropdown-item">
            <div className="media">
              <img
                src="dist/img/user1-128x128.jpg"
                alt="User Avatar"
                className="img-size-50 mr-3 img-circle"
              />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Brad Diesel
                  <span className="float-right text-sm text-danger">
                    <i className="fas fa-star" />
                  </span>
                </h3>
                <p className="text-sm">Call me whenever you can...</p>
                <p className="text-sm text-muted">
                  <i className="far fa-clock mr-1" /> 4 Hours Ago
                </p>
              </div>
            </div>
          </a>
          <div className="dropdown-divider" />
          <a href="#test" className="dropdown-item">
            <div className="media">
              <img
                src="dist/img/user8-128x128.jpg"
                alt="User Avatar"
                className="img-size-50 img-circle mr-3"
              />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  John Pierce
                  <span className="float-right text-sm text-muted">
                    <i className="fas fa-star" />
                  </span>
                </h3>
                <p className="text-sm">I got your message bro</p>
                <p className="text-sm text-muted">
                  <i className="far fa-clock mr-1" /> 4 Hours Ago
                </p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#test" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img
                src="dist/img/user3-128x128.jpg"
                alt="User Avatar"
                className="img-size-50 img-circle mr-3"
              />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Nora Silvester
                  <span className="float-right text-sm text-warning">
                    <i className="fas fa-star" />
                  </span>
                </h3>
                <p className="text-sm">The subject goes here</p>
                <p className="text-sm text-muted">
                  <i className="far fa-clock mr-1" /> 4 Hours Ago
                </p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#test" className="dropdown-item dropdown-footer">
            See All Messages
          </a>
        </div>
      </li>
      {/* Notifications Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#test">
          <i className="far fa-bell" />
          <span className="badge badge-warning navbar-badge">15</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">
            15 Notifications
          </span>
          <div className="dropdown-divider" />
          <a href="#test" className="dropdown-item">
            <i className="fas fa-envelope mr-2" /> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#test" className="dropdown-item">
            <i className="fas fa-users mr-2" /> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#test" className="dropdown-item">
            <i className="fas fa-file mr-2" /> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#test" className="dropdown-item dropdown-footer">
            See All Notifications
          </a>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          data-widget="fullscreen"
          href="#test"
          role="button"
        >
          <i className="fas fa-expand-arrows-alt" />
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#test" role="button">
          {/* <img src="/logo.png" alt="profile" /> */}
          Admin
        </a>
      </li>
    </ul>
  );
}
