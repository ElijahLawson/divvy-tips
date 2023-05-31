import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, useMemo } from "react";
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

  const newData = useMemo(() => {
    let copiedData = [...data];
    for (const index in copiedData) {
      for (const updatedData of updateData) {
        if (
          Number(copiedData[index]?.employee_id) ===
          Number(updatedData.employee_id)
        ) {
          copiedData[index] = updatedData;
        }
      }
    }

    copiedData = [...copiedData, ...addData];

    const deleteIds = deleteData.map((shift) => shift.employee_id);

    copiedData = copiedData.filter((shift) => {
      return !deleteIds.includes(shift.employee_id);
    });

    return copiedData;
  }, [data, updateData, addData, deleteData]);

  console.log(updateData);
  console.log(deleteData);
  console.log(addData);
  console.log(newData);

  const bartenders = useSelector((store) => store.bartenders);
  const shift = useSelector((store) => store.shifts);

  const [bartenderSelected, setBartenderSelected] = useState('');
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [timeInInput, setTimeInInput] = useState("");
  const [timeOutInput, setTimeOutInput] = useState("");
  const [breakTimeInput, setBreakTimeInput] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [shiftTipsId, setShiftTipsId] = useState(0);

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

  const resetState = () => {
    setBartenderSelected("");
    setFirstNameInput("");
    setLastNameInput("");
    setTimeInInput("");
    setTimeOutInput("");
    setBreakTimeInput(0);
    setEmployeeId(0);
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

  const handleNewEdit = (shift) => {
    setEmployeeId(shift.employee_id);
    setShiftTipsId(shift.shift_tips_id);
    setFirstNameInput(shift.first_name);
    setLastNameInput(shift.last_name);
    setTimeInInput(shift.time_in);
    setTimeOutInput(shift.time_out);
    setBreakTimeInput(shift.break_time);
    setIsAdding(false);
    setOpen((o) => !o);
  };

  const editRow = () => {
    const totalHours = calculateTotalHours();
    const dataToEdit = {
      first_name: firstNameInput,
      last_name: lastNameInput,
      time_in: timeInInput,
      time_out: timeOutInput,
      break_time: Number(breakTimeInput),
      hours_worked: totalHours,
      employee_id: employeeId,
      shift_tips_id: shiftTipsId,
      shift_id: shift.id,
    };

    setUpdateData([...updateData, dataToEdit]);
    resetState();
    setOpen((o) => !o);
  };

  const handleDeleteRow = (id) => {
    console.log(id);
    console.log(newData);

    const dataToDelete = newData.filter((shift) => shift.employee_id === id);
    setDeleteData([...deleteData, dataToDelete[0]]);
    console.log(deleteData);
    resetState();
  };

  const handleStartAddRow = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setIsAdding(true);
    setOpen((o) => !o);
  };

  const addRow = () => {
    const totalHours = calculateTotalHours();
    console.log(bartenderSelected);
    let bartender = 0;
    if (bartenderSelected === '') {
      setBartenderSelected(bartenders[0].id)
    }

    bartender = bartenders.filter(
      (bartender) => bartender.id === Number(bartenderSelected)
    )[0];

    console.log(bartender);

    const dataToAdd = {
      first_name: bartender.first_name,
      last_name: bartender.last_name,
      employee_id: Number(bartenderSelected),
      time_in: timeInInput,
      time_out: timeOutInput,
      break_time: Number(breakTimeInput),
      hours_worked: totalHours,
      shift_id: shift.id,
    };

    setAddData([...addData, dataToAdd]);
    resetState();
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
        type: "SAGA/EDIT_SHIFT_TIPS",
        payload: updateData,
      });
    }

    if (addData.length > 0) {
      dispatch({
        type: "SAGA/ADD_SHIFT_TIPS",
        payload: addData,
      });
    }

    if (deleteData.length > 0) {
      dispatch({
        type: "SAGA/DELETE_SHIFT_TIPS",
        payload: deleteData,
      });
    }

    navigate("/tips-edit");
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
          {newData.map((shift) => {
            return (
              <tr>
                <td>
                  {shift.first_name} {shift.last_name}
                </td>
                <td>{shift.hours_worked}</td>
                <td>
                  <button onClick={() => handleNewEdit(shift)}>Edit</button>
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
                                  <option> - </option>
                                  {bartenders.map((bartender) => {
                                    return (
                                      <option
                                        value={bartender.id}
                                        key={bartender.id}
                                      >
                                        {`${bartender.first_name} ${bartender.last_name}`}
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
                  <button onClick={() => handleDeleteRow(shift.employee_id)}>
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
