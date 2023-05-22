import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar/NavBar";

function UserPage() {

    const user = useSelector(store => store.user);
    const history = useHistory();

    console.log(user);

    const onAddTips = () => {

    }

    const onRunMoney = () => {

    }

    const onShiftHistory = () => {

    }

    return(
        <div>
            <NavBar />
            <div>
                <h1>{user.first_name} {user.last_name}</h1>
                <h3>{user.location_id}</h3>
                <p>Weekly Hours: </p>
                <p>Weekly Tips: </p>
            </div>
            <div>
                <button onClick={onAddTips}>Add Tips</button>
            </div>
            <div>
                <button onClick={onRunMoney}>Run Money</button>
            </div>
            <div>
                <button onClick={onShiftHistory}>Shift History</button>
            </div>
        </div>


    )
}

export default UserPage;