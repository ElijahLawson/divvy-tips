import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Layout;
