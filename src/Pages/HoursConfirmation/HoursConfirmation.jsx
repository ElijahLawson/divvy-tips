import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShiftConfirmation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const hours = useSelector((store) => store.hours);

  console.log(hours);

  const fetchData = () => {
    dispatch({
      type: "SAGA/GET_OR_CREATE_SHIFT",
    });
  };

  const onHoursConfirm = (event) => {
    event.preventDefault();

    navigate("/tips-edit");
  };

  return (
    <div>
      <div>
        <h2>Confirm / Edit Hours</h2>
        <table>
          <thead>
            <tr>
              <th>Bartender</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((time) => {
              return (
                <tr>
                  <td>
                    {time.first_name} {time.last_name}
                  </td>
                  <td>{time.hours_worked}</td>
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
        <button onClick={onHoursConfirm}>Next</button>
      </div>
    </div>
  );
}

export default ShiftConfirmation;
