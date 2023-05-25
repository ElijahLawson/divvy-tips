import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function Header() {
    return(
        <div>
            <NavBar />
            <Link to="/home">
                <h2 className="nav-title">Divvy Tips</h2>
            </Link>
        </div>
    )
}

export default Header;