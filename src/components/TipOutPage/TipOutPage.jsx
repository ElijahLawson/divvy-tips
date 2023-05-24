import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar/NavBar";

function TipOutPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, [])

    const shift = useSelector(store => store.shifts);
    console.log("SHIFT", shift)
    const hours = useSelector(store => store.hours);
    console.log("HOURS", hours)
    const shiftTips = useSelector(store => store.shiftTips);
    console.log("TIPS", shiftTips)
    const bar = useSelector(store => store.bars)
    console.log("BAR", bar)
    
    const [data, setData] = useState({});
    const [tipout, setTipout] = useState([]);

    const fetchData = () => {
        dispatch({type: 'SAGA/GET_OR_CREATE_SHIFT'});
        dispatch({type: 'SAGA/FETCH_SHIFT_HOURS', payload: shift.id});
        dispatch({type: 'SAGA/FETCH_SHIFT_TIPS', payload: shift.id});
        dispatch({type: 'SAGA/FETCH_USER_BAR'})
        runTheMoney();
    }

    const calculateTotalHours = () => {
        return hours.map(hour => Number(hour.hours_worked))
                                .reduce((accumulator, hours_worked) => accumulator + hours_worked, 0);
    }

    const calculateTotalCash = () => {
        return shiftTips.map(tips => Number(tips.total_tips.replace(/[^\d.]/g, '')))
                                    .reduce((accumulator, tips) => accumulator + tips, 0);
    }

    const calculateBarBackCut = (totalCash) => {
        console.log(bar);
        return Math.round(totalCash * Number(bar[0].barback_cut))
    }

    const calculateHourly = (totalHours, totalCash, barbackCut) => {
        let postCut = totalCash - barbackCut;
        let preFormatted = postCut / totalHours;
        return preFormatted.toFixed(2);
    }

    const runCalculations = () => {
        let totalHours = calculateTotalHours();
        let totalCash = calculateTotalCash();
        let barbackCut = calculateBarBackCut(totalCash);
        let hourly = calculateHourly(totalHours, totalCash, barbackCut)

        const data = {
            totalHours: totalHours,
            totalCash: totalCash,
            barbackCut: barbackCut,
            hourly: hourly
        }
        return data;
    }

    const runTheMoney = () => {

        const data = runCalculations();
        setData(data);

        const calculatedTipout = hours.map(bartender => ({...bartender, tipout: Math.round(bartender.hours_worked * data.hourly)}));

        return setTipout(calculatedTipout);

    }

    return (
        <div>
            <NavBar />
            <div>
                <h3>Total Hours: {data.totalHours}</h3>
                <h3>Hourly: {data.hourly}</h3>
                <h3>Barback Cut: {data.barbackCut}</h3>

                <table>
                        <thead>
                            <tr>
                                <th>Bartender</th>
                                <th>Hours Worked</th>
                                <th>Tipout</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipout.map(tips => {
                                return(
                                    <tr>
                                        <td>{tips.first_name} {tips.last_name}</td>
                                        <td>{tips.hours_worked}</td>
                                        <td>{tips.tipout}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                </table>
            </div>
        </div>
    )
}

export default TipOutPage