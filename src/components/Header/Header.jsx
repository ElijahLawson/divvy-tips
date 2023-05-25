import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOutButton from "../BackButton/BackButton";
import HamburgerButton from "../HamburgerButton/HamburgerButton";

function Header() {
  const user = useSelector((store) => store.user);

  return (
    <div className="bg-black h-18 flex justify-center">
      {user.id && <LogOutButton />}
      <Link to="/home">
        <img
          src="logos/logo_transparent_header.png"
          className="scale-75 -ml-1 border border-white"
        ></img>
      </Link>
      <HamburgerButton />
    </div>
  );
}

export default Header;
