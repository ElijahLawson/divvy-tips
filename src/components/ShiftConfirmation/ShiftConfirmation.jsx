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

    const shiftTips = useSelector(store => store.shiftTips);
    const shift = useSelector(store => store.shifts);
    const user = useSelector(store => store.user);
    const runner_id = user.id;


    const fetchData = () => {
        dispatch({
            type: 'SAGA/GET_OR_CREATE_SHIFT'
        })

        dispatch({
            type: 'SAGA/FETCH_SHIFT_TIPS',
            payload: shift.id
        })
    }
    
    console.log(shiftTips);
    console.log(shift);
    console.log(runner_id);

    return(
        <div>
            <NavBar />
            
        </div>
    )
}

export default ShiftConfirmation;