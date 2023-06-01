import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

function AddTips() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "SAGA/GET_OR_CREATE_SHIFT",
    });
  }, []);

  const shift = useSelector((store) => store.shifts);
  const drawers = useSelector((store) => store.drawers);

  const [timeInInput, setTimeInInput] = useState("");
  const [timeOutInput, setTimeOutInput] = useState("");
  const [breakCheck, setBreakCheck] = useState(false);
  const [breakTimeInput, setBreakTimeInput] = useState(0);
  const [drawerSelected, setDrawerSelected] = useState(1);
  const [chargedTips, setChargedTips] = useState(0);

  const calculateTotalHours = () => {
    const timeIn = DateTime.fromISO(timeInInput);
    const timeOut = DateTime.fromISO(timeOutInput);

    let totalHours = 0;

    if (timeOut.diff(timeIn).as("hours") < 0) {
      totalHours += timeOut.diff(timeIn).as("hours") + 24;
    } else {
      totalHours += timeOut.diff(timeIn).as("hours");
    }

    totalHours -= breakTimeInput / 60;

    return totalHours;
  };

  const onAddTips = (event) => {
    event.preventDefault();

    const totalHours = calculateTotalHours();
    const shift_tips = {
      timeIn: timeInInput,
      timeOut: timeOutInput,
      breakTime: breakTimeInput,
      totalHours: totalHours,
      total_tips: chargedTips,
      drawer_id: drawerSelected,
      shift_id: shift.id,
    };

    console.log('shift_tips', shift_tips);

    dispatch({
      type: "SAGA/ADD_USER_TIPS",
      payload: shift_tips,
    });

    navigate("/confirm-tips");
  };

  return (
    <div>
      <div>
        <form onSubmit={onAddTips}>

          <div className="m-4">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Time In:
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="time"
                name="timeIn"
                value={timeInInput}
                required
                onChange={(event) => setTimeInInput(event.target.value)}
              />
            </label>
          </div>

          <div className="m-4">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Time Out:
              <input
               className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="time"
                name="timeOut"
                value={timeOutInput}
                required
                onChange={(event) => setTimeOutInput(event.target.value)}
              />
            </label>
          </div>

          <div className="m-4">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Break?
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-4"
                type="checkbox"
                name="breakCheck"
                value={breakCheck}
                onChange={() => setBreakCheck(!breakCheck)}
              />
            </label>
          </div>

          <div className="m-4">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Break Time (in Minutes):
              <input
               className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                name="breakTime"
                value={breakTimeInput}
                disabled={!breakCheck}
                required
                onChange={(event) => setBreakTimeInput(event.target.value)}
              />
            </label>
          </div>

          <div className="m-4">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Drawers
              <select
               className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={drawerSelected}
                onChange={(event) => setDrawerSelected(event.target.value)}
              >
                {drawers.map((drawer) => {
                  return (
                    <option value={drawer.id} key={drawer.id}>
                      {drawer.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <div className="m-4">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Charged Tips:
              <input
               className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                name="chargedTips"
                value={chargedTips}
                required
                onChange={(event) => setChargedTips(event.target.value)}
              />
            </label>
          </div>
          <div className="flex justify-center m-8">
            <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-3xl px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" type="submit">Add Tips!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTips;
