import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar/NavBar";


function ShiftConfirmation() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, [])

    const hours = useSelector(store => store.hours);
    const shift = useSelector(store => store.shifts);

    console.log(hours)


    const fetchData = () => {
        dispatch({
            type: 'SAGA/GET_OR_CREATE_SHIFT'
        })

        dispatch({
            type: 'SAGA/FETCH_SHIFT_HOURS',
            payload: shift.id
        })
    }

    const onHoursConfirm = (event) => {
        event.preventDefault();
        
        // let totalHours = hours.map(hour => Number(hour.hours_worked))
        //                         .reduce((accumulator, hours_worked) => accumulator + hours_worked, 0);
        
        // dispatch({
        //     type: 'SAGA/UPDATE_SHIFT_HOURS',
        //     payload: {
        //         totalHours: totalHours,
        //         shift_id: shift.id
        //     }
        // })

        history.push('/tips-edit')
    }

    return(
        <div>
            <NavBar />
            <div>
                <h2>Confirm / Edit Hours</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Bartender</th>
                            <th>Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hours.map(time => {
                            return(
                                <tr>
                                    <td>{time.first_name} {time.last_name}</td>
                                    <td>{time.hours_worked}</td>
                                    <td><button>Edit</button></td>
                                    <td><button>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={onHoursConfirm}>Next</button>
            </div>
        </div>
    )
}

export default ShiftConfirmation;