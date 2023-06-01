import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

    dispatch({
      type: 'SAGA/FETCH_TIPOUT_SHIFT_TIPS',
      payload: shift.id
    })
    dispatch({ type: "SAGA/FETCH_USER_BAR" });
  };

  const calculateTotalHours = () => {
    return hours
      .map((hour) => Number(hour.hours_worked))
      .reduce((accumulator, hours_worked) => accumulator + hours_worked, 0);
  };

  const calculateTotalCash = () => {
    console.log("🚀 ~ file: TipOutPage.jsx:18 ~ TipOutPage ~ shiftTips:", shiftTips)
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
      }
    });

    return setTipout(calculatedTipout);
  };

  return (
    <div>
      <div className="grid grid-cols-1 place-content-center">
        <h3 className="text-center text-xl mt-4">Total Hours: {data.totalHours}</h3>
        <h3 className="text-center text-xl mt-4">Hourly: {data.hourly}</h3>
        <h3 className="text-center text-xl mt-4">Barback Cut: {data.barbackCut}</h3>
        <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-auto mt-4 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={runTheMoney}>Run the Money!</button>
      </div>
        <table className="m-4 text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th className="px-5 py-3 uppercase">Bartender</th>
              <th className="px-5 py-3 uppercase">Hours Worked</th>
              <th className="px-5 py-3 uppercase">Tipout</th>
            </tr>
          </thead>
          <tbody>
            {tipout.map((tips) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 px-5 py-3">
                  <td>
                    {tips.first_name} {tips.last_name}
                  </td>
                  <td className="text-center">{tips.hours_worked}</td>
                  <td className="text-center">{tips.tipout}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );
}

//2540 - 254 - 

export default TipOutPage;
