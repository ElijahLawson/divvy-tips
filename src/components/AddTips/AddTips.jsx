import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";

function AddTips() {

    const dispatch = useDispatch();

    const [timeInInput, setTimeInInput] = useState('');
    const [timeOutInput, setTimeOutInput] = useState('');
    const [breakCheck, setBreakCheck] = useState(false);
    const [breakTimeInput, setBreakTimeInput] = useState(0)
    const [chargedTips, setChargedTips] = useState(0);

    return(
        <div>
            <NavBar />
            <div>
                <form>
                    <div>
                        <label>
                            Time In: 
                            <input
                                type="text"
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
                                type="text"
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
                </form>
            </div>
        </div>
    )
}

export default AddTips