import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";


import NavBar from "../NavBar/NavBar";

function ShiftSetup() {

    const dispatch = useDispatch();

    const [cashTips, setCashTips] = useState(0);
    const [barBackCheck, setBarBackCheck] = useState(false);
    const shifts = useSelector(store => store.shifts);
    console.log(shifts.todays_shift_id)
    
    const onShiftSetup = (event) => {
        event.preventDefault();

        dispatch({
            type: 'SAGA/FETCH_TIPS',
            payload: shifts.todays_shift_id
        })
    }

    return(
        <div>
            <NavBar />

            <div>
                <form onSubmit={onShiftSetup}>
                    <div>
                        <label>
                            Cash Tips:
                            <input 
                                type="number"
                                name="cashTips"
                                value={cashTips}
                                onChange={event => setCashTips(event.target.value)}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Bar Back:
                            <input 
                                type="checkbox"
                                name="barBackCheck"
                                value={barBackCheck}
                                onChange={() => setBarBackCheck(!barBackCheck)}
                            />
                        </label>
                    </div>
                    <button type="submit">Next</button>
                </form>
            </div>
        </div>
    )
}

export default ShiftSetup;