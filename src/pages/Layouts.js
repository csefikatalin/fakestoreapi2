import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            FakeStore
          </Link>
          
    
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Publikus tartalom
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin felület
                </Link>
              </li>
            </ul>
          
        </div>
      </nav>

      {/* Ide kerül majd az útvonalak/linkek által meghatározott tartalom */}
      <Outlet />
    </>
  );
}

export default Layout;
