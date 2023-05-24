import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar/NavBar";

function TipsConfirmation() {

    const history = useHistory();
    const dispatch = useDispatch();

        useEffect(() => {
        fetchData();
    }, []);

    const shift = useSelector(store => store.shifts);
    const shiftTips = useSelector(store => store.shiftTips);

    const fetchData = () => {

        dispatch({
            type: 'SAGA/FETCH_SHIFT_TIPS',
            payload: shift.id
        })

        dispatch({
            type: 'SAGA/GET_OR_CREATE_SHIFT'
        })


    }

    const onTipsConfirm = (event) => {
        event.preventDefault();

        // let totalCash = shiftTips.map(tips => Number(tips.total_tips.replace(/[^\d.]/g, '')))
        //                             .reduce((accumulator, tips) => accumulator + tips, 0);

        history.push('/tip-out');
    }

    return(
        <div>
            <NavBar />
                <div>
                    <h2>Confirm / Edit Tips</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Drawer</th>
                                <th>Charged Tips</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shiftTips.map(tips => {
                                return(
                                    <tr>
                                        <td>{tips.name}</td>
                                        <td>{tips.total_tips}</td>
                                        <td><button>Edit</button></td>
                                        <td><button>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={onTipsConfirm}>Next</button>
                </div>
        </div>
    )
}

export default TipsConfirmation;