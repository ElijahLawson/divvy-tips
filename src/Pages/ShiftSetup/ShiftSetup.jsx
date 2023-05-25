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
  }, []);

  const [cashTips, setCashTips] = useState(0);
  const [barBackCheck, setBarBackCheck] = useState(false);

  const shift = useSelector((store) => store.shifts);
  const user = useSelector((store) => store.user);

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
      <div>
        <form onSubmit={onShiftSetup}>
          <div>
            <label>
              Cash Tips:
              <input
                type="number"
                name="cashTips"
                value={cashTips}
                onChange={(event) => setCashTips(event.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Bar Back:
              <input
                type="checkbox"
                name="barBackCheck"
                value={barBackCheck}
                onChange={() => setBarBackCheck(!barBackCheck)}
              />
            </label>
          </div>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default ShiftSetup;
