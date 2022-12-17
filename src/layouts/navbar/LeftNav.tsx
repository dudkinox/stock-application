export default function LeftNav() {
  return (
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
      <li className="nav-item d-none d-sm-inline-block">
        <a href="index3.html" className="nav-link">
          Home
        </a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="#test" className="nav-link">
          Contact
        </a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="#test" className="nav-link">
          สบายโฟน-admin
        </a>
      </li>
    </ul>
  );
}
