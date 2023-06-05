import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import Popup from "reactjs-popup";
import './EditTipsTable.css';

// WARNING TO ALL WHO SET FOOT HERE, ONLY TARAVANGIAN ON HIS BEST DAY COULD DECIPHER WHAT IS HAPPENING HERE. TREAD WITH CARE.

function EditTipsTable(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Redux Stores
  const drawers = useSelector(store => store.drawers);
  const shiftDrawers = useSelector(store => store.shiftDrawers);
  const shift_tips = useSelector((store) => store.shiftTips);
  const shift = useSelector(store => store.shifts);

  //These are gonna be our running data objects that will be used to either fill the table rows or push to server for db updates
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  //UseMemo is used here as a fix to redux not updating on refresh. Keeps everything from being one step behind, statewise
  const newData = useMemo(() => {
    const copiedData = [...data];
    for (const index in copiedData) {
      for (const updatedData of updateData) {
        if (copiedData[index]?.id === updatedData.id) {
          copiedData[index] = updatedData
        }
      }
    }
    return copiedData;
  }, [data, updateData]);

  //React State used across the table for edits and rendering table rows
  const [drawerId, setDrawerId] = useState(0);
  const [drawerName, setDrawerName] = useState('');
  const [locationId, setLocationId] = useState(0);
  const [shiftId, setShiftId] = useState(0);
  const [chargedTipsInput, setChargedTipsInput] = useState([]);

  //React State used for edit popup functionality
  const [open, setOpen] = useState(false);

  //Parse the data from the redux store to better work with this functionality 
  const parseDrawers = () => {
    for (let drawer of drawers) {
      for (let shift_tip of shift_tips) {
        if (drawer.id === shift_tip.drawer_id) {
          drawer.charged_tips = shift_tip.total_tips;
          drawer.shift_tips_id = shift_tip.shift_tips_id;
        }
        drawer.shift_id = shift.id
      }
      if (!drawer.charged_tips) {
          drawer.charged_tips = '0';
      }
    }
    return drawers;
  }

  //Function to fetch data from the server -> runs in useEffect
  const fetchData = () => {

    dispatch({
      type: "SAGA/GET_OR_CREATE_SHIFT",
    });

    const formattedData = parseDrawers();
    
    setData([...formattedData]);
  };

  //useEffect is grabbing our data on page load
  useEffect(() => {
    fetchData();
  }, []);

  //When we start a new edit, theres some base information that will be set to state.
  //This ensures the right drawer and shift id is selected and also that the
  //popup has the previous information within its inputs.
  const handleNewEdit = (id, name, shift_id, location_id) => {
    setDrawerId(id);
    setDrawerName(name);
    setLocationId(location_id)
    setShiftId(shift_id);
    setChargedTipsInput(0)
    setOpen((o) => !o);
  };

  //editRow builds a new object of shift_tips information, then adds it to the updateData array.
  //TODO: Change the base functionality to use one json object instead of array of objects (big maybe)
  const editRow = () => {
    const dataToEdit = {
      id: drawerId,
      name: drawerName,
      charged_tips: chargedTipsInput,
      location_id: locationId,
      shift_id: shiftId,
    };
    setUpdateData([...updateData, dataToEdit])
    setOpen((o) => !o);
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    editRow();
  };

  //TODO: need to use this to reformat the table so the numbers look good
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  //onConfirm first filters out the edited data
  //then filters out any added drawers
  //then dispatchs to the server the necessary data to make those changes
  const onConfirm = () => {
    //okay so on confirm just make shift_tips with just the drawer id and the total_tips
    const filteredEdits = newData.filter(editedDrawer => {
      return shift_tips.map(shiftDrawer => shiftDrawer.drawer_id).includes(editedDrawer.id);
    })

    const addedDrawers = newData.filter(drawer => {
      return !filteredEdits.map(filteredDrawer => filteredDrawer.id).includes(drawer.id);
    }).filter(drawer => drawer.charged_tips != '0');

    if (filteredEdits.length > 0) {
      dispatch({
        type: 'SAGA/EDIT_SHIFT_TIPS_DRAWERS',
        payload: filteredEdits
      })
    }

    if (addedDrawers.length > 0) {
      dispatch({
        type: 'SAGA/ADD_SHIFT_TIPS_DRAWERS_ONLY',
        payload: addedDrawers
      })
    }
    
    navigate("/tip-out");
  };

  return (
    <div>
      <table className="w-full text-md text-gray-500 dark:text-gray-400">
        <thead>
          <tr>
            <th className="px-6 py-3 uppercase">Drawer</th>
            <th className="px-6 py-3 uppercase">Charged Tips</th>
          </tr>
        </thead>
        <tbody>
          {newData.map((drawer) => {
            return (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className="text-center">{drawer.name}</td>
                <td className="text-center">{drawer.charged_tips}</td>
                <td className="pl-3 py-1">
                  <button className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1 mb-1 mt-1 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900" onClick={() => handleNewEdit(drawer.id, drawer.name, drawer.shift_id, drawer.location_id)}>Edit</button>
                  <Popup open={open} closeOnDocumentClick>
                    <div>
                      <form onSubmit={(event) => handleConfirm(event)}>
                        <h3 className="text-center text-2xl font-medium text-gray-900 dark:text-white">{drawer.name}</h3>
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-5">
                          Charged Tips:
                          <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            name="chargedTips"
                            value={chargedTipsInput}
                            required
                            onChange={(event) =>
                              setChargedTipsInput(event.target.value)
                            }
                          />
                        </label>
                        <div className="flex justify-center mt-10">
                          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" type="submit">Confirm</button>
                        </div>
                      </form>
                    </div>
                  </Popup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end mt-6">
        <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={onConfirm}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg></button>
      </div>
    </div>
  );
}

export default EditTipsTable;
