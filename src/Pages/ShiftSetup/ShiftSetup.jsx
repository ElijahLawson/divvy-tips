import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShiftSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "SAGA/GET_OR_CREATE_SHIFT",
    });
    dispatch({
      type: "SAGA/GET_SHIFT_TIPS",
    })
  }, []);

  const [cashTips, setCashTips] = useState(0);
  const [barBackCheck, setBarBackCheck] = useState(false);

  const shift = useSelector((store) => store.shifts);
  const user = useSelector((store) => store.user);

  console.log(shift);

  const onShiftSetup = (event) => {
    event.preventDefault();

    const shiftCashTipsAndBBC = {
      id: shift.id,
      totalCash: cashTips,
      barbackCheck: barBackCheck,
      runner_id: user.id,
    };


    dispatch({
      type: "SAGA/UPDATE_SHIFT_BBC_CASH",
      payload: shiftCashTipsAndBBC,
    });

    navigate(`/hours-edit/`);
  };

  return (
    <div>
      <div className="m-5">
        <form onSubmit={onShiftSetup}>
          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Cash Tips:
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                name="cashTips"
                value={cashTips}
                onChange={(event) => setCashTips(event.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Bar Back:
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-4"
                type="checkbox"
                name="barBackCheck"
                value={barBackCheck}
                onChange={() => setBarBackCheck(!barBackCheck)}
              />
            </label>
          </div>
          <div className="flex justify-end mt-6">
            <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" type="submit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShiftSetup;
