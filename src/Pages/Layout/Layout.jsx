import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
import { Navigate } from "react-router-dom";
function Layout() {



  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* <!-- Navbar --> */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <BackButton />
            </div>
            <div className="flex-1">
              <Link to="/">
                <img
                  src="/logos/logo_transparent_header.png"
                  className="scale-75 -ml-2"
                ></img>
              </Link>
            </div>

            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
            </label>
          </div>
          {/* <!-- Page content here --> */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 bg-base-100">
            <div>
              
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Layout;
