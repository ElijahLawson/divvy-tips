import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import Popup from "reactjs-popup";

// WARNING TO ALL WHO SET FOOT HERE, ONLY TARAVANGIAN ON HIS BEST DAY COULD DECIPHER WHAT IS HAPPENING HERE. TREAD WITH CARE.

function EditTable(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState(props.tableConfig.defaultState);
  const [updateData, setUpdateData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [addData, setAddData] = useState([]);

  console.log(data);
  console.log(updateData);
  console.log(deleteData);
  console.log(addData);

  const [bartenderSelected, setBartenderSelected] = useState('');
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [timeInInput, setTimeInInput] = useState("");
  const [timeOutInput, setTimeOutInput] = useState("");
  const [breakTimeInput, setBreakTimeInput] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [shiftTipsId, setShiftTipsId] = useState(0)

  const bartenders = useSelector((store) => store.bartenders);
  const shift = useSelector(store => store.shifts);
  console.log(bartenders);
  console.log(bartenderSelected)

  const [isAdding, setIsAdding] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [updateData]);

  const fetchData = () => {
    dispatch({
      type: "SAGA/FETCH_BAR_BARTENDERS",
    });
    setData(props.tableConfig.data);
  };

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

  const handleNewEdit = (id, shift_tips_id, firstName, lastName) => {
    setEmployeeId(id);
    setShiftTipsId(shift_tips_id)
    setFirstNameInput(firstName);
    setLastNameInput(lastName);
    setIsAdding(false);
    setOpen((o) => !o);
  };

  const editRow = () => {
    const totalHours = calculateTotalHours();
    const dataToEdit = {
      timeIn: timeInInput,
      timeOut: timeOutInput,
      breakTime: Number(breakTimeInput),
      totalHours: totalHours,
      employeeId: employeeId,
      shift_tips_id: shiftTipsId,
      shift_id: shift.id,
    };

    setUpdateData([...updateData, dataToEdit]);
    setEmployeeId(0);
    setOpen((o) => !o);
  };

  const handleDeleteRow = (id) => {
    const dataToDelete = data.filter((shift) => {
      return shift.shift_tips_id === id;
    });
    const dataToStay = data.filter((shift) => {
      return shift.shift_tips_id !== id;
    });

    setData(dataToStay);
    setDeleteData([...deleteData, dataToDelete[0]]);
  };

  const handleStartAddRow = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setIsAdding(true);
    setOpen((o) => !o);
  };

  const addRow = () => {
    const totalHours = calculateTotalHours();

    console.log(bartenderSelected)

    const dataToAdd = {
      employee_id: Number(bartenderSelected),
      timeIn: timeInInput,
      timeOut: timeOutInput,
      breakTime: Number(breakTimeInput),
      totalHours: totalHours,
      shift_id: shift.id,
    };

    setAddData([...addData, dataToAdd]);
    setEmployeeId(0);
    setOpen((o) => !o);
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    !isAdding ? editRow() : addRow();
  };

  const ensureDeletionsAreRemoved = () => {
    let deletedIds = deleteData.map((shift) => shift.employee_id);
    let filteredEdits = updateData.filter((shift) => {
      return !deletedIds.includes(shift.employeeId);
    });
    setUpdateData(filteredEdits);
  };

  const onConfirm = () => {
    ensureDeletionsAreRemoved();

    if (updateData.length > 0) {
        dispatch({
            type: 'SAGA/EDIT_SHIFT_TIPS',
            payload: updateData
        })
    }

    if (addData.length > 0) {
        dispatch({
            type: 'SAGA/ADD_SHIFT_TIPS',
            payload: addData
        })
    }

    if (deleteData.length > 0) {
        dispatch({
            type: 'SAGA/DELETE_SHIFT_TIPS',
            payload: deleteData
        })
    }

    navigate('/tips-edit');
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Bartender</th>
            <th>Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((shift) => {
            return (
              <tr>
                <td>
                  {shift.first_name} {shift.last_name}
                </td>
                <td>{shift.hours_worked}</td>
                <td>
                  <button
                    onClick={() =>
                      handleNewEdit(
                        shift.employee_id,
                        shift.shift_tips_id,
                        shift.first_name,
                        shift.last_name
                      )
                    }
                  >
                    Edit
                  </button>
                  <Popup open={open} closeOnDocumentClick>
                    <div>
                      <h1>Hours Edit</h1>
                      <form onSubmit={(event) => handleConfirm(event)}>
                        <div>
                          {isAdding ? (
                            <div>
                              <label>
                                Bartender:
                                <select
                                  value={bartenderSelected}
                                  onChange={(event) =>
                                    setBartenderSelected(event.target.value)
                                  }
                                >
                                  {bartenders.map((bartender) => {
                                    return (
                                      <option
                                        value={bartender.id}
                                        key={bartender.id}
                                      >
                                        {bartender.first_name}
                                        {bartender.last_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </label>
                            </div>
                          ) : (
                            <h3>
                              {firstNameInput} {lastNameInput}
                            </h3>
                          )}
                          <label>
                            Time In:
                            <input
                              type="time"
                              name="timeIn"
                              value={timeInInput}
                              placeholder={shift.time_in}
                              required
                              onChange={(event) =>
                                setTimeInInput(event.target.value)
                              }
                            />
                          </label>
                        </div>

                        <div>
                          <label>
                            Time Out:
                            <input
                              type="time"
                              name="timeOut"
                              value={timeOutInput}
                              required
                              onChange={(event) =>
                                setTimeOutInput(event.target.value)
                              }
                            />
                          </label>
                        </div>

                        <div>
                          <label>
                            Break Time (in Minutes):
                            <input
                              type="number"
                              name="breakTime"
                              value={breakTimeInput}
                              required
                              onChange={(event) =>
                                setBreakTimeInput(event.target.value)
                              }
                            />
                          </label>
                        </div>

                        <div>
                          <button type="submit">Confirm</button>
                        </div>
                      </form>
                    </div>
                  </Popup>
                </td>
                <td>
                  <button onClick={() => handleDeleteRow(shift.shift_tips_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleStartAddRow}>Add Bartender</button>
      <button onClick={onConfirm}>Next</button>
    </div>
  );
}

export default EditTable;
