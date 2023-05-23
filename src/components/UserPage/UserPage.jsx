import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";

function UserPage() {

    const user = useSelector(store => store.user);
    const shifts = useSelector(store => store.shifts);

    const history = useHistory();
    const dispatch = useDispatch();

    const onAddTips = () => {
        dispatch({
            type: 'SAGA/GET_OR_CREATE_SHIFT'
        })

        history.push('/add-tips');
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