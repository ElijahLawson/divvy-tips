import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function TipOutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const shift = useSelector((store) => store.shifts);
  const hours = useSelector((store) => store.hours);
  const shiftTips = useSelector((store) => store.shiftTips);
  const bar = useSelector((store) => store.bars);

  const [data, setData] = useState({});
  const [tipout, setTipout] = useState([]);

  const fetchData = () => {
    dispatch({ type: "SAGA/GET_OR_CREATE_SHIFT" });
    dispatch({ type: "SAGA/FETCH_USER_BAR" });
  };

  const calculateTotalHours = () => {
    return hours
      .map((hour) => Number(hour.hours_worked))
      .reduce((accumulator, hours_worked) => accumulator + hours_worked, 0);
  };

  const calculateTotalCash = () => {
    let chargedTips = shiftTips
      .map((tips) => Number(tips.total_tips.replace(/[^\d.]/g, "")))
      .reduce((accumulator, tips) => accumulator + tips, 0);
    return chargedTips + Number(shift.total_cash.replace(/[^\d.]/g, ""));
  };

  const calculateBarBackCut = (totalCash) => {
    if (shift.barback_check === true) {
      return Math.round(totalCash * Number(bar[0].barback_cut));
    } else {
      return 0;
    }
  };

  const calculateHourly = (totalHours, totalCash, barbackCut) => {
    let postCut = totalCash - barbackCut;
    let preFormatted = postCut / totalHours;
    return preFormatted.toFixed(2);
  };

  const runCalculations = () => {
    let totalHours = calculateTotalHours();
    let totalCash = calculateTotalCash();
    let barbackCut = calculateBarBackCut(totalCash);
    let hourly = calculateHourly(totalHours, totalCash, barbackCut);

    const data = {
      totalHours: totalHours,
      totalCash: totalCash,
      barbackCut: barbackCut,
      hourly: hourly,
    };
    return data;
  };

  const runTheMoney = () => {
    const data = runCalculations();
    setData(data);

    const calculatedTipout = hours.map((bartender) => ({
      ...bartender,
      tipout: Math.round(bartender.hours_worked * data.hourly),
    }));

    dispatch({
      type: "SAGA/UPDATE_SHIFT_HOURLY",
      payload: {
        hourly: data.hourly,
        shift_id: shift.id,
      },
    });

    return setTipout(calculatedTipout);
  };

  return (
    <div>
      <div>
        <h3>Total Hours: {data.totalHours}</h3>
        <h3>Hourly: {data.hourly}</h3>
        <h3>Barback Cut: {data.barbackCut}</h3>

        <button onClick={runTheMoney}>Run the Money!</button>
        <table>
          <thead>
            <tr>
              <th>Bartender</th>
              <th>Hours Worked</th>
              <th>Tipout</th>
            </tr>
          </thead>
          <tbody>
            {tipout.map((tips) => {
              return (
                <tr>
                  <td>
                    {tips.first_name} {tips.last_name}
                  </td>
                  <td>{tips.hours_worked}</td>
                  <td>{tips.tipout}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TipOutPage;
