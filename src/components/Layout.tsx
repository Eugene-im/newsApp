import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="App">
      <header className="App-header">Just NEWS</header>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav> */}

      <main>
        <Outlet />
      </main>
      <footer>© 2023</footer>
    </div>
  );
}
