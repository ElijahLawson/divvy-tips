import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TipsConfirmation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const shift = useSelector((store) => store.shifts);
  const shiftTips = useSelector((store) => store.shiftTips);

  const fetchData = () => {
    dispatch({
      type: "SAGA/GET_OR_CREATE_SHIFT",
    });

    // console.log(shift.id);

    // dispatch({
    //     type: 'SAGA/FETCH_SHIFT_TIPS',
    //     payload: shift.id
    // })
  };

  const onTipsConfirm = (event) => {
    event.preventDefault();

    navigate("/tip-out");
  };

  return (
    <div>
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
            {shiftTips.map((tips) => {
              return (
                <tr>
                    <td>{tips.name}</td>
                    <td>{tips.total_tips}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={onTipsConfirm}>Next</button>
      </div>
    </div>
  );
}

export default TipsConfirmation;
