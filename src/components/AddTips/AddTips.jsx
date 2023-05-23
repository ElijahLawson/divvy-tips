import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { DateTime } from "luxon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddTips() {

    const dispatch = useDispatch();
    const history = useHistory();

    const shift = useSelector(store => store.shifts);

    const [timeInInput, setTimeInInput] = useState('');
    const [timeOutInput, setTimeOutInput] = useState('');
    const [breakCheck, setBreakCheck] = useState(false);
    const [breakTimeInput, setBreakTimeInput] = useState(0)
    const [chargedTips, setChargedTips] = useState(0);

    const calculateTotalHours = () => {
        const timeIn = DateTime.fromISO(timeInInput);
        const timeOut = DateTime.fromISO(timeOutInput);
        
        let totalHours = 0;

        if (timeOut.diff(timeIn).as('hours') < 0) {
            totalHours += timeOut.diff(timeIn).as('hours') + 24
        } else {
            totalHours += timeOut.diff(timeIn).as('hours');
        }

        totalHours -= (breakTimeInput / 60);

       return totalHours;
    }

    const onAddTips = (event) => {
        event.preventDefault();
        const totalHours = calculateTotalHours();
        const shift_tips = {
            timeIn: timeInInput,
            timeOut: timeOutInput,
            totalHours: totalHours,
            total_tips: chargedTips,
            shift_id: shift.todays_shift_id
        }

        dispatch({
            type: 'SAGA/ADD_TIPS',
            payload: shift_tips
        })

        history.push('/tip-entered');
    }

    return(
        <div>
            <NavBar />
            <div>
                <form onSubmit={onAddTips}>
                    <div>
                        <label>
                            Time In: 
                            <input
                                type="time"
                                name="timeIn"
                                value={timeInInput}
                                required
                                onChange={event => setTimeInInput(event.target.value)}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Time Out: 
                            <input
                                type="time"
                                name="timeOut"
                                value={timeOutInput}
                                required
                                onChange={event => setTimeOutInput(event.target.value)}
                            />
                        </label>
                    </div>
                    
                    <div>
                        <label>
                            Break? 
                            <input
                                type="checkbox"
                                name="breakCheck"
                                value={breakCheck}
                                onChange={() => setBreakCheck(!breakCheck)}
                            />
                        </label>
                    </div>
                    
                    <div>
                        <label>
                            Break Time (in Minutes): 
                            <input
                                type="number"
                                name="breakTime"
                                value={breakTimeInput}
                                disabled={!breakCheck}
                                required
                                onChange={event => setBreakTimeInput(event.target.value)}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Charged Tips: 
                            <input
                                type="number"
                                name="chargedTips"
                                value={chargedTips}
                                required
                                onChange={event => setChargedTips(event.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit">Add Tips!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTips