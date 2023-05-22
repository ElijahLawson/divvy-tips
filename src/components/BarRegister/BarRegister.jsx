import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BarRegister() {

    const dispatch = useDispatch();

    const [barName, setBarName] = useState('');
    const [city, setCity] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [barBackCut, setBarBackCut] = useState('');
    
    const registerBar = (event) => {
        dispatch({
            type: 'SAGA/REGISTER_BAR',
            payload: {
                barName: barName,
                city: city,
                stateCode: stateCode,
                barBackCut: barBackCut
            }
        })
    }

    return(
        <div>
            <h1>Location Setup</h1>

            <form onSubmit={registerBar}>
                <div>
                    <label>
                        Bar Name:
                        <input
                            type="text"
                            name="barName"
                            value={barName}
                            required
                            onChange={(event) => setBarName(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={city}
                            required
                            onChange={(event) => setCity(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        State:
                        <input
                            type="text"
                            name="barname"
                            value={stateCode}
                            required
                            onChange={(event) => setStateCode(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Bar Back Cut:
                        <input
                            type="text"
                            name="barbackcut"
                            value={barBackCut}
                            required
                            onChange={(event) => setBarBackCut(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Register Bar</button>
                </div>
            </form>
        </div>
    )
}

export default BarRegister;