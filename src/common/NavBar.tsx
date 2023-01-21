export default function NavBarCommon() {
  return (
    <nav className="main-header navbar navbar-expand main-bg">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="#test"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
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
      </ul>
    </nav>
  );
}
