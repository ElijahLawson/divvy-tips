import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import Popup from "reactjs-popup";
import './EditTable.css'

// WARNING TO ALL WHO SET FOOT HERE, ONLY TARAVANGIAN ON HIS BEST DAY COULD DECIPHER WHAT IS HAPPENING HERE. TREAD WITH CARE.

function EditTable(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //These are gonna be our running data objects that will be used to either fill the table rows or push to server for db updates
  const [data, setData] = useState(props.tableConfig.defaultState);
  const [updateData, setUpdateData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [addData, setAddData] = useState([]);

  //UseMemo is used here as a fix to redux not updating on refresh. Keeps everything from being one step behind, statewise
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

  //Redux stores
  const bartenders = useSelector((store) => store.bartenders);
  const shift = useSelector((store) => store.shifts);

  //React State used across the table for edits and rendering table rows
  const [bartenderSelected, setBartenderSelected] = useState('');
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [timeInInput, setTimeInInput] = useState("");
  const [timeOutInput, setTimeOutInput] = useState("");
  const [breakTimeInput, setBreakTimeInput] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [shiftTipsId, setShiftTipsId] = useState(0);

  //React State used for edit/add popup functionality
  const [isAdding, setIsAdding] = useState(false);
  const [open, setOpen] = useState(false);

  //useEffect is grabbing our data on page load
  useEffect(() => {
    fetchData();
  }, [updateData]);

  //Function to dispatch to the server
  const fetchData = () => {
    dispatch({
      type: "SAGA/FETCH_BAR_BARTENDERS",
    });

    //Between the two tables, I used two different methods of data setting. 
    //This one is using a config prop to get everything set
    setData(props.tableConfig.data);
  };

  //resetState function just resets all the necessary state. Used when an action is completed like popup confirm
  const resetState = () => {
    setBartenderSelected("");
    setFirstNameInput("");
    setLastNameInput("");
    setTimeInInput("");
    setTimeOutInput("");
    setBreakTimeInput(0);
    setEmployeeId(0);
  };

  //Function using Luxon library to calculate the total hours. 
  //Gets a little fancy with bar shifts usually going past midnight and into the new day.
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

  //When we start a new edit, theres some base information that will be set to state.
  //This ensures the right employee and shift id is selected and also that the
  //popup has the previous information within its inputs.
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

  //editRow builds a new object of shift_tips information, then adds it to the updateData array.
  //TODO: Change the base functionality to use one json object instead of array of objects (big maybe)
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

  //handleDeleteRow filters out the intended row to delete from the newData array (which is used to populate the data in the table)
  const handleDeleteRow = (id) => {
    const dataToDelete = newData.filter((shift) => shift.employee_id === id);
    setDeleteData([...deleteData, dataToDelete[0]]);
    resetState();
  };

  //handleStartAddRow ensures the necessary states are set correctly for an add
  const handleStartAddRow = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setIsAdding(true);
    setOpen((o) => !o);
  };

  //addRow runs the calculateTotalHours
  //then builds an object that will be passed to the addData object array
  const addRow = () => {
    const totalHours = calculateTotalHours();
    let bartender = 0;
    if (bartenderSelected === '') {
      setBartenderSelected(bartenders[0].id)
    }

    bartender = bartenders.filter(
      (bartender) => bartender.id === Number(bartenderSelected)
    )[0];

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

  //handleConfirm has a quick ternary statement to determine if editRow or addRow function needs to be ran
  const handleConfirm = (event) => {
    event.preventDefault();

    !isAdding ? editRow() : addRow();
  };

  //ensureDeletionsAreRemoved filters out the deleteData from the updateData
  const ensureDeletionsAreRemoved = () => {
    let deletedIds = deleteData.map((shift) => shift.employee_id);
    let filteredEdits = updateData.filter((shift) => {
      return !deletedIds.includes(shift.employeeId);
    });
    setUpdateData(filteredEdits);
  };

  //OnConfirm runs ensureDeletetionsAreRemoved then makes each necessary dispatch to the server to save the changes made.
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
      <div>
        <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th className="px-6 py-3 uppercase">Bartender</th>
              <th className="px-6 py-3 uppercase">Hours Worked</th>
              <th className='-mr-4'> </th>
              <th className="uppercase"><button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 text-center mr-1 ml-9 mb-1 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"onClick={handleStartAddRow}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</button></th>
            </tr>
          </thead>
          <tbody>
            {newData.map((shift) => {
              return (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <td className="pl-3 py-3">
                    {shift.first_name} {shift.last_name}
                  </td>
                  <td className="px-6 py-3">{shift.hours_worked}</td>
                  <td>
                    <button className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 mt-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900" onClick={() => handleNewEdit(shift)}>Edit</button>
                    <Popup open={open} closeOnDocumentClick>
                      <div>
                        <form onSubmit={(event) => handleConfirm(event)}>
                          <div>
                            {isAdding ? (
                              <div>
                                <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                  Bartender:
                                  <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                              <h3 className="text-center text-lg font-medium text-gray-900 dark:text-white">
                                {firstNameInput} {lastNameInput}
                              </h3>
                            )}
                            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                              Time In:
                              <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                              Time Out:
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                              Break Time (in Minutes):
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                          <div className="flex justify-center mt-10">
                            <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" type="submit">Confirm</button>
                          </div>
                        </form>
                      </div>
                    </Popup>
                  </td>
                  <td>
                    <button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1 mb-1 mt-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={() => handleDeleteRow(shift.employee_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div className="flex justify-end mt-6">
          <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={onConfirm}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </button>
        </div>
        

    </div>
  );
}

export default EditTable;
