import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DateTime } from "luxon";

function ShiftHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shiftHistory = useSelector((store) => store.shiftHistory);
  const [shifts, setShifts] = useState([]);

  console.log(shiftHistory);
  useEffect(() => {
    dispatch({
      type: "SAGA/FETCH_USER_SHIFT_HISTORY",
    });
    parseShifts();
  }, []);

  const calculateTipOut = (hourlyArg, hoursWorkedArg) => {
    let hourly = Number(hourlyArg.replace(/[^\d.]/g, ""));
    let hours_worked = Number(hoursWorkedArg);
    let tipOut = `$${Math.round(hourly * hours_worked)}`;
    return tipOut;
  };

  const formatDate = (date) => {
    return (date = DateTime.fromISO(date).toLocaleString());
  };

  const parseShifts = () => {
    let parsedShifts = shiftHistory.map((shift) => {
      return {
        date: formatDate(shift.date),
        hours_worked: shift.hours_worked,
        tipOut: calculateTipOut(shift.hourly, shift.hours_worked),
      };
    });

    console.log(parsedShifts);

    setShifts(parsedShifts);
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours Worked</th>
              <th>Tipout</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => {
              return (
                <tr>
                  <td>{shift.date}</td>
                  <td>{shift.hours_worked}</td>
                  <td>{shift.tipOut}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShiftHistory;
